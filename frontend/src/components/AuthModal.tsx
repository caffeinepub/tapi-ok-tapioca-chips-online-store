import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuthModal } from '../contexts/AuthModalContext';
import { useInternalAuth } from '../contexts/InternalAuthContext';
import { Mail, Lock, User, AtSign, AlertCircle, CheckCircle2, Eye, EyeOff, X, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();
  const { login, signup } = useInternalAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [signupDisplayName, setSignupDisplayName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation state
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveTab('login');
        setLoginUsername('');
        setLoginPassword('');
        setSignupDisplayName('');
        setSignupUsername('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setShowLoginPassword(false);
        setShowSignupPassword(false);
        setShowConfirmPassword(false);
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setDisplayNameError('');
        setConfirmPasswordError('');
      }, 200);
    }
  }, [isOpen]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Username validation
  const validateUsername = (username: string): boolean => {
    if (!username.trim()) {
      setUsernameError('Username is required');
      return false;
    }
    if (username.trim().length < 4) {
      setUsernameError('Username must be at least 4 characters');
      return false;
    }
    if (username.trim().length > 20) {
      setUsernameError('Username must be at most 20 characters');
      return false;
    }
    if (/[./]/.test(username)) {
      setUsernameError('Username cannot contain . or /');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Password strength calculation
  const getPasswordStrength = (password: string): { strength: string; color: string; percentage: number } => {
    if (password.length === 0) return { strength: '', color: '', percentage: 0 };
    if (password.length < 6) return { strength: 'Weak', color: 'text-red-500', percentage: 33 };
    if (password.length < 10) return { strength: 'Medium', color: 'text-yellow-500', percentage: 66 };
    return { strength: 'Strong', color: 'text-green-500', percentage: 100 };
  };

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginUsername.trim()) {
      setUsernameError('Username is required');
      return;
    } else {
      setUsernameError('');
    }

    if (!loginPassword) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    setIsLoading(true);
    try {
      await login(loginUsername, loginPassword);
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
      closeModal();
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.message || 'Invalid username or password',
        icon: <AlertCircle className="h-5 w-5" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!signupDisplayName.trim()) {
      setDisplayNameError('Display name is required');
      isValid = false;
    } else {
      setDisplayNameError('');
    }

    const isUsernameValid = validateUsername(signupUsername);
    if (!isUsernameValid) isValid = false;

    const isEmailValid = validateEmail(signupEmail);
    if (!isEmailValid) isValid = false;

    if (!signupPassword) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (signupPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!signupConfirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (signupPassword !== signupConfirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!isValid) return;

    setIsLoading(true);
    try {
      await signup(signupUsername, signupEmail, signupPassword, signupDisplayName);
      toast.success('Account created!', {
        description: `Welcome to TAPI OK, ${signupDisplayName}! Your account has been created successfully.`,
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
      closeModal();
    } catch (error: any) {
      toast.error('Signup failed', {
        description: error.message || 'Unable to create account. Please try again.',
        icon: <AlertCircle className="h-5 w-5" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(signupPassword);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[480px] p-0 gap-0 bg-amber-400 dark:bg-amber-500 border-2 border-amber-500 dark:border-amber-600 shadow-2xl"
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
          }}
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-black/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-50 p-1"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-gray-900" />
        </button>

        <DialogHeader className="px-6 pt-6 pb-4 space-y-2">
          <div className="flex justify-center mb-2">
            <img
              src="/assets/ChatGPT Image Feb 23, 2026, 12_00_04 PM (1)-1.png"
              alt="TAPI OK Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Welcome to TAPI OK
          </DialogTitle>
          <DialogDescription className="text-center text-gray-800">
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
          <TabsList
            className="grid w-full grid-cols-2 mx-6 bg-amber-300 dark:bg-amber-600"
            style={{ width: 'calc(100% - 3rem)' }}
          >
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-800"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-800"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="px-6 pb-6 pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username" className="text-gray-900 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="login-username"
                    type="text"
                    placeholder="Enter your username"
                    value={loginUsername}
                    onChange={(e) => {
                      setLoginUsername(e.target.value);
                      if (usernameError) setUsernameError('');
                    }}
                    className="pl-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="username"
                  />
                </div>
                {usernameError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {usernameError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-gray-900 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    className="pl-10 pr-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-200/60 border border-amber-300">
                <Info className="h-4 w-4 text-amber-800 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-900">
                  Use the username you registered with. Login works on this device where you signed up.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </Button>

              <p className="text-center text-sm text-gray-800">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="font-semibold text-[#D32F2F] hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="px-6 pb-6 pt-4">
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="signup-displayname" className="text-gray-900 font-medium">
                  Display Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="signup-displayname"
                    type="text"
                    placeholder="Your full name"
                    value={signupDisplayName}
                    onChange={(e) => {
                      setSignupDisplayName(e.target.value);
                      if (displayNameError) setDisplayNameError('');
                    }}
                    className="pl-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="name"
                  />
                </div>
                {displayNameError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {displayNameError}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="signup-username" className="text-gray-900 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="Choose a username (4–20 chars)"
                    value={signupUsername}
                    onChange={(e) => {
                      setSignupUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''));
                      if (usernameError) setUsernameError('');
                    }}
                    className="pl-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="username"
                  />
                </div>
                {usernameError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {usernameError}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-900 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    className="pl-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="email"
                  />
                </div>
                {emailError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-900 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    className="pl-10 pr-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Password strength indicator */}
                {signupPassword && (
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-amber-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          passwordStrength.percentage <= 33
                            ? 'bg-red-500'
                            : passwordStrength.percentage <= 66
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength.percentage}%` }}
                      />
                    </div>
                    <p className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.strength} password
                    </p>
                  </div>
                )}
                {passwordError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-gray-900 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    value={signupConfirmPassword}
                    onChange={(e) => {
                      setSignupConfirmPassword(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError('');
                    }}
                    className="pl-10 pr-10 bg-white/80 border-amber-300 focus:border-amber-500 text-gray-900 placeholder:text-gray-500"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>

              <p className="text-center text-sm text-gray-800">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="font-semibold text-[#D32F2F] hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
