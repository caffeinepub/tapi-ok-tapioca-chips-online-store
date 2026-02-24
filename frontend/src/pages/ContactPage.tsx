import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, MapPin, Phone, Clock, Lightbulb, MessageSquare } from 'lucide-react';
import { useSubmitContactForm, useSubmitIdea, useSubmitFeedback } from '../hooks/useQueries';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { useInternalAuth } from '../contexts/InternalAuthContext';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const submitForm = useSubmitContactForm();

  const [ideaName, setIdeaName] = useState('');
  const [ideaEmail, setIdeaEmail] = useState('');
  const [ideaMessage, setIdeaMessage] = useState('');
  const submitIdea = useSubmitIdea();

  // Feedback form state
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const submitFeedback = useSubmitFeedback();

  const { t } = useLanguage();
  const { user } = useInternalAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(t.fillAllFields);
      return;
    }

    try {
      await submitForm.mutateAsync({ name: name.trim(), email: email.trim(), message: message.trim() });
      toast.success(t.messageSent);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error(t.messageFailed);
      console.error(error);
    }
  };

  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ideaName.trim() || !ideaMessage.trim()) {
      toast.error(t.fillAllFields);
      return;
    }

    try {
      await submitIdea.mutateAsync({
        name: ideaName.trim(),
        email: ideaEmail.trim() || null,
        message: ideaMessage.trim(),
      });
      toast.success(t.ideaSubmitted);
      setIdeaName('');
      setIdeaEmail('');
      setIdeaMessage('');
    } catch (error) {
      toast.error(t.ideaFailed);
      console.error(error);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackName.trim() || !feedbackEmail.trim() || !feedbackMessage.trim()) {
      toast.error('Please fill in all feedback fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(feedbackEmail.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      // Pass user ID if logged in, otherwise null
      const userId = user?.id != null ? BigInt(user.id) : null;
      await submitFeedback.mutateAsync({
        userId,
        name: feedbackName.trim(),
        email: feedbackEmail.trim(),
        message: feedbackMessage.trim(),
      });
      toast.success('Thank you for your feedback!', {
        description: 'Your feedback has been saved and will be reviewed by our team.',
      });
      setFeedbackName('');
      setFeedbackEmail('');
      setFeedbackMessage('');
    } catch (error: any) {
      toast.error('Failed to submit feedback', {
        description: error?.message || 'Please try again later.',
      });
      console.error(error);
    }
  };

  return (
    <div className="container px-4 md:px-8 lg:px-12 py-12 md:py-16">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
          {t.getInTouch}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.questionsOrFeedback}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto mb-12">
        <Card className="transition-all duration-700 hover:shadow-2xl border-2 hover:border-brand/50 animate-in fade-in slide-in-from-left">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">{t.sendMessage}</CardTitle>
            <CardDescription className="text-base">{t.fillForm}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base text-foreground">
                  {t.name}
                </Label>
                <Input
                  id="name"
                  placeholder={t.yourName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base text-foreground">
                  {t.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.yourEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base text-foreground">
                  {t.message}
                </Label>
                <Textarea
                  id="message"
                  placeholder={t.tellUs}
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full group shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={submitForm.isPending}
              >
                {submitForm.isPending ? (
                  t.sending
                ) : (
                  <span className="transition-transform group-hover:translate-x-1">{t.sendMessage}</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700 delay-200">
          <Card className="transition-all duration-500 hover:shadow-2xl border-2 hover:border-brand/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{t.contactInfo}</CardTitle>
              <CardDescription>{t.reachOut}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4 group p-3 rounded-lg transition-all duration-300 hover:bg-brand/5">
                <div className="shrink-0">
                  <MapPin className="h-6 w-6 text-brand transition-transform group-hover:scale-110 group-hover:-translate-y-1" />
                </div>
                <div>
                  <p className="font-semibold text-base mb-1 text-foreground">{t.address}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Kerala, Malappuram, Ponnani
                  </p>
                </div>
              </div>

              <a
                href="tel:+919656864293"
                className="flex items-start space-x-4 group p-3 rounded-lg transition-all duration-300 hover:bg-brand/5 cursor-pointer"
              >
                <div className="shrink-0">
                  <Phone className="h-6 w-6 text-brand transition-transform group-hover:scale-110 group-hover:rotate-12" />
                </div>
                <div>
                  <p className="font-semibold text-base mb-1 text-foreground">{t.phone}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-brand transition-colors">
                    +91 9656864293
                  </p>
                </div>
              </a>

              <a
                href="mailto:unierajsalcompany@gmail.com"
                className="flex items-start space-x-4 group p-3 rounded-lg transition-all duration-300 hover:bg-brand/5 cursor-pointer"
              >
                <div className="shrink-0">
                  <Mail className="h-6 w-6 text-brand transition-transform group-hover:scale-110 group-hover:-translate-y-1" />
                </div>
                <div>
                  <p className="font-semibold text-base mb-1 text-foreground">{t.email}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-brand transition-colors break-all">
                    unierajsalcompany@gmail.com
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card className="transition-all duration-500 hover:shadow-2xl border-2 hover:border-brand/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-brand animate-pulse" />
                {t.businessHours}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-gradient-to-br from-brand/10 to-brand/5 border border-brand/20">
                <p className="text-center text-lg font-bold text-brand mb-1">{t.open247}</p>
                <p className="text-center text-sm text-muted-foreground">{t.alwaysHere}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="max-w-5xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
        <Card className="transition-all duration-700 hover:shadow-2xl border-2 hover:border-brand/50 bg-gradient-to-br from-background to-brand/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
              <MessageSquare className="h-6 w-6 text-brand" />
              Share Your Feedback
            </CardTitle>
            <CardDescription className="text-base">
              Tell us about your experience with TAPI OK products. Your feedback is stored securely and helps us improve.
              {user && (
                <span className="ml-1 text-brand font-medium">
                  Submitting as {user.name}.
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="feedbackName" className="text-base text-foreground">
                    Your Name
                  </Label>
                  <Input
                    id="feedbackName"
                    placeholder="Enter your name"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    required
                    className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedbackEmail" className="text-base text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="feedbackEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    required
                    className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedbackMessage" className="text-base text-foreground">
                  Your Feedback
                </Label>
                <Textarea
                  id="feedbackMessage"
                  placeholder="Share your thoughts, suggestions, or experience with our products..."
                  rows={5}
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full group shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={submitFeedback.isPending}
              >
                {submitFeedback.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="transition-transform group-hover:translate-x-1">Submit Feedback</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Idea Suggestion Box */}
      <div id="idea-suggestion-box" className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300">
        <Card className="transition-all duration-700 hover:shadow-2xl border-2 hover:border-brand/50 bg-gradient-to-br from-background to-brand/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
              <Lightbulb className="h-6 w-6 text-brand" />
              {t.ideaSuggestionBox}
            </CardTitle>
            <CardDescription className="text-base">{t.weValueFeedback}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleIdeaSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ideaName" className="text-base text-foreground">
                  {t.name}
                </Label>
                <Input
                  id="ideaName"
                  placeholder={t.yourName}
                  value={ideaName}
                  onChange={(e) => setIdeaName(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ideaEmail" className="text-base text-foreground">
                  {t.emailOptional}
                </Label>
                <Input
                  id="ideaEmail"
                  type="email"
                  placeholder={t.yourEmail}
                  value={ideaEmail}
                  onChange={(e) => setIdeaEmail(e.target.value)}
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ideaMessage" className="text-base text-foreground">
                  {t.yourIdea}
                </Label>
                <Textarea
                  id="ideaMessage"
                  placeholder={t.shareThoughts}
                  rows={6}
                  value={ideaMessage}
                  onChange={(e) => setIdeaMessage(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02] focus:border-brand/50 focus:shadow-md resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full group shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={submitIdea.isPending}
              >
                {submitIdea.isPending ? (
                  t.sending
                ) : (
                  <span className="transition-transform group-hover:translate-x-1">{t.submitIdea}</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
