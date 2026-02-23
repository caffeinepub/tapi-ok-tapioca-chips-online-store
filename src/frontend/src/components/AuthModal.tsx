import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuthModal } from '../contexts/AuthModalContext';
import { useInternalAuth } from '../contexts/InternalAuthContext';
import { Mail, Lock, User, AlertCircle, CheckCircle2, Eye, EyeOff, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();
  const { login, signup } = useInternalAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setActiveTab('login');
        setLoginEmail('');
        setLoginPassword('');
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setShowLoginPassword(false);
        setShowSignupPassword(false);
        setShowConfirmPassword(false);
        setEmailError('');
        setPasswordError('');
        setNameError('');
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

    // Validate fields
    const isEmailValid = validateEmail(loginEmail);
    if (!loginPassword) {
      setPasswordError('Password is required');
      return;
    } else {
      setPasswordError('');
    }

    if (!isEmailValid) return;

    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
      closeModal();
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.message || 'Invalid email or password',
        icon: <AlertCircle className="h-5 w-5" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    if (!signupName.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

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
      await signup(signupEmail, signupPassword, signupName);
      toast.success('Account created!', {
        description: 'Welcome to TAPI OK. Your account has been created successfully.',
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
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Welcome to TAPI OK
          </DialogTitle>
          <DialogDescription className="text-center text-gray-800">
            Sign in to your account or create a new one
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-6 bg-amber-300 dark:bg-amber-600" style={{ width: 'calc(100% - 3rem)' }}>
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
                <Label htmlFor="login-email" className="text-gray-900 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`pl-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 ${emailError ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-gray-900 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className={`pl-10 pr-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 ${passwordError ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors"
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {passwordError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup" className="px-6 pb-6 pt-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-gray-900 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value);
                      setNameError('');
                    }}
                    className={`pl-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 ${nameError ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {nameError && (
                  <p className="text-sm text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {nameError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-900 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={`pl-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 ${emailError ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-900 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      setPasswordError('');
                    }}
                    className={`pl-10 pr-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 ${passwordError ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors"
                    tabIndex={-1}
                  >
                    {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {passwordError}
                  </p>
                )}
                {signupPassword && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-800">Password strength:</span>
                      <span className={`font-medium ${passwordStrength.color}`}>{passwordStrength.strength}</span>
                    </div>
                    <div className="h-1.5 w-full bg-amber-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.percentage === 33 ? 'bg-red-500' :
                          passwordStrength.percentage === 66 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-gray-900 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signupConfirmPassword}
                    onChange={(e) => {
                      setSignupConfirmPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                    className={`pl-10 pr-10 bg-white text-gray-900 border-gray-300 placeholder:text-gray-500 ${confirmPasswordError ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-sm text-red-700 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
