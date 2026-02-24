import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, ContactSubmission, AuthUserProfile, FeedbackSubmission } from '../backend';

export function useGetAvailableProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsAll();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(productId: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', productId?.toString()],
    queryFn: async () => {
      if (!actor || !productId) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(name, email, message);
    },
  });
}

export function useSubmitIdea() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string | null; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitIdea(name, email, message);
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<AuthUserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: AuthUserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useRegisterUser() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      username,
      email,
      displayName,
    }: {
      username: string;
      email: string;
      displayName: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createUserAccount(username, email, displayName);
    },
  });
}

export function useSubmitFeedback() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      userId,
      name,
      email,
      message,
    }: {
      userId: bigint | null;
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitFeedback(userId, name, email, message);
    },
  });
}

export function useGetAllFeedbacks() {
  const { actor, isFetching } = useActor();

  return useQuery<FeedbackSubmission[]>({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFeedbacks();
    },
    enabled: !!actor && !isFetching,
  });
}
