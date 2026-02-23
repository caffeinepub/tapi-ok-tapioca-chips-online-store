import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';
import { User, Mail } from 'lucide-react';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await saveProfile.mutateAsync({ name: name.trim(), email: email.trim() });
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  return (
    <Dialog open={showProfileSetup}>
      <DialogContent className="sm:max-w-md animate-in fade-in zoom-in duration-300" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand/20 to-brand/5 shadow-lg">
            <User className="h-8 w-8 text-brand" />
          </div>
          <DialogTitle className="text-2xl text-center">Welcome to TAPI OK!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Let's set up your profile to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-brand" />
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95" 
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
