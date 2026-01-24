'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLogin, useRegister } from '@/features/auth/auth.queries';
import { useAuth } from '@/features/auth/use-auth';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

interface FormErrors {
  [key: string]: string;
}

function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const tabFromUrl = searchParams.get('tab');
  const initialTab = tabFromUrl === 'signup' ? 'signup' : 'signin';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [signInErrors, setSignInErrors] = useState<FormErrors>({});
  const [signUpErrors, setSignUpErrors] = useState<FormErrors>({});

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup' || tab === 'signin') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Validation
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;
  const validatePhone = (phone: string) =>
    /^[0-9+\-\s()]+$/.test(phone) && phone.length >= 10;

  const validateSignIn = () => {
    const errors: FormErrors = {};
    if (!signInData.email) errors.email = 'Email is required';
    else if (!validateEmail(signInData.email))
      errors.email = 'Please enter a valid email';
    if (!signInData.password) errors.password = 'Password is required';
    else if (!validatePassword(signInData.password))
      errors.password = 'Password must be at least 6 characters';
    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = () => {
    const errors: FormErrors = {};
    if (!signUpData.name) errors.name = 'Name is required';
    if (!signUpData.email) errors.email = 'Email is required';
    else if (!validateEmail(signUpData.email))
      errors.email = 'Please enter a valid email';
    if (!signUpData.phone) errors.phone = 'Phone number is required';
    else if (!validatePhone(signUpData.phone))
      errors.phone = 'Please enter a valid phone number';
    if (!signUpData.password) errors.password = 'Password is required';
    else if (!validatePassword(signUpData.password))
      errors.password = 'Password must be at least 6 characters';
    if (!signUpData.confirmPassword)
      errors.confirmPassword = 'Please confirm your password';
    else if (signUpData.password !== signUpData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';
    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    try {
      const result = await loginMutation.mutateAsync({
        email: signInData.email,
        password: signInData.password,
      });
      // Token is stored in localStorage by useLogin mutation
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    try {
      await registerMutation.mutateAsync({
        name: signUpData.name,
        email: signUpData.email,
        phone: signUpData.phone,
        password: signUpData.password,
      });
      setActiveTab('signin');
      setSignUpData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const updateSignIn = (field: string, value: string | boolean) => {
    setSignInData((prev) => ({ ...prev, [field]: value }));
    if (signInErrors[field])
      setSignInErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const updateSignUp = (field: string, value: string) => {
    setSignUpData((prev) => ({ ...prev, [field]: value }));
    if (signUpErrors[field])
      setSignUpErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className='flex min-h-screen'>
      {/* Left - Background */}
      <div className='relative hidden lg:flex lg:w-1/2'>
        <div
          className='h-full w-full bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: 'url(/images/auth-background.png)' }}
        />
      </div>

      {/* Right - Form */}
      <div className='flex w-full items-center justify-center bg-white p-8 lg:w-1/2'>
        <div className='w-full max-w-md space-y-8'>
          {/* Back Button */}
          <Button
            variant='link'
            onClick={() => router.push(ROUTES.HOME)}
            className='flex items-center space-x-2 text-neutral-600 hover:text-neutral-800'
          >
            <ArrowLeft size={20} />
            <span className='text-sm font-medium'>Back</span>
          </Button>

          {/* Logo */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Image
                src='/icons/logo-foody.svg'
                alt='Foody Logo'
                width={32}
                height={32}
                className='h-8 w-8'
              />
              <h1 className='display-md-extrabold text-foreground'>Foody</h1>
            </div>
            <div className='space-y-2'>
              <h2 className='display-sm-extrabold text-foreground'>
                Welcome Back
              </h2>
              <p className='text-muted-foreground text-sm'>
                Good to see you again! Let's eat
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid h-full grid-cols-2 rounded-xl bg-neutral-200 p-1'>
              <TabsTrigger value='signin'>Sign in</TabsTrigger>
              <TabsTrigger value='signup'>Sign up</TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value='signin'>
              <form onSubmit={handleSignIn} className='space-y-4'>
                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={signInData.email}
                    onChange={(e) => updateSignIn('email', e.target.value)}
                    className={cn(
                      'h-12',
                      signInErrors.email && 'border-red-500'
                    )}
                  />
                  {signInErrors.email && (
                    <p className='text-xs text-red-500'>{signInErrors.email}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={signInData.password}
                      onChange={(e) => updateSignIn('password', e.target.value)}
                      className={cn(
                        'h-12 pr-10',
                        signInErrors.password && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signInErrors.password && (
                    <p className='text-xs text-red-500'>
                      {signInErrors.password}
                    </p>
                  )}
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    checked={signInData.rememberMe}
                    onChange={(e) =>
                      updateSignIn('rememberMe', e.target.checked)
                    }
                    className='text-primary focus:ring-primary h-4 w-4 rounded border-neutral-300'
                  />
                  <label
                    htmlFor='rememberMe'
                    className='text-sm text-neutral-600'
                  >
                    Remember Me
                  </label>
                </div>

                {loginMutation.error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                    <p className='text-sm text-red-600'>
                      Invalid email or password
                    </p>
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={loginMutation.isPending}
                  className='h-12 w-full'
                >
                  {loginMutation.isPending ? 'Signing in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value='signup'>
              <form onSubmit={handleSignUp} className='space-y-4'>
                <div className='space-y-2'>
                  <Input
                    type='text'
                    placeholder='Name'
                    value={signUpData.name}
                    onChange={(e) => updateSignUp('name', e.target.value)}
                    className={cn(
                      'h-12',
                      signUpErrors.name && 'border-red-500'
                    )}
                  />
                  {signUpErrors.name && (
                    <p className='text-xs text-red-500'>{signUpErrors.name}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={signUpData.email}
                    onChange={(e) => updateSignUp('email', e.target.value)}
                    className={cn(
                      'h-12',
                      signUpErrors.email && 'border-red-500'
                    )}
                  />
                  {signUpErrors.email && (
                    <p className='text-xs text-red-500'>{signUpErrors.email}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Input
                    type='tel'
                    placeholder='Phone Number'
                    value={signUpData.phone}
                    onChange={(e) => updateSignUp('phone', e.target.value)}
                    className={cn(
                      'h-12',
                      signUpErrors.phone && 'border-red-500'
                    )}
                  />
                  {signUpErrors.phone && (
                    <p className='text-xs text-red-500'>{signUpErrors.phone}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={signUpData.password}
                      onChange={(e) => updateSignUp('password', e.target.value)}
                      className={cn(
                        'h-12 pr-10',
                        signUpErrors.password && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signUpErrors.password && (
                    <p className='text-xs text-red-500'>
                      {signUpErrors.password}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        updateSignUp('confirmPassword', e.target.value)
                      }
                      className={cn(
                        'h-12 pr-10',
                        signUpErrors.confirmPassword && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {signUpErrors.confirmPassword && (
                    <p className='text-xs text-red-500'>
                      {signUpErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {registerMutation.error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                    <p className='text-sm text-red-600'>
                      Registration failed. Please try again.
                    </p>
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={registerMutation.isPending}
                  className='h-12 w-full'
                >
                  {registerMutation.isPending
                    ? 'Creating account...'
                    : 'Register'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
