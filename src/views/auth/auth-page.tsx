'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useSignInForm, useSignUpForm, useAuth } from '@/features/auth';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  const tabFromUrl = searchParams.get('tab');
  const activeTab = tabFromUrl === 'signup' ? 'signup' : 'signin';

  const signIn = useSignInForm();
  const signUp = useSignUpForm({
    onSuccess: () => {
      router.push(`${ROUTES.AUTH}?tab=signin`);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  const handleTabChange = (value: string) => {
    router.push(`${ROUTES.AUTH}?tab=${value}`);
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
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className='grid h-full grid-cols-2 rounded-xl bg-neutral-200 p-1'>
              <TabsTrigger value='signin'>Sign in</TabsTrigger>
              <TabsTrigger value='signup'>Sign up</TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value='signin'>
              <form onSubmit={signIn.handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={signIn.data.email}
                    onChange={(e) =>
                      signIn.updateField('email', e.target.value)
                    }
                    className={cn(
                      'h-12',
                      signIn.errors.email && 'border-red-500'
                    )}
                  />
                  {signIn.errors.email && (
                    <p className='text-xs text-red-500'>
                      {signIn.errors.email}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={signIn.showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={signIn.data.password}
                      onChange={(e) =>
                        signIn.updateField('password', e.target.value)
                      }
                      className={cn(
                        'h-12 pr-10',
                        signIn.errors.password && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={signIn.togglePasswordVisibility}
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
                    >
                      {signIn.showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {signIn.errors.password && (
                    <p className='text-xs text-red-500'>
                      {signIn.errors.password}
                    </p>
                  )}
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    checked={signIn.data.rememberMe}
                    onChange={(e) =>
                      signIn.updateField('rememberMe', e.target.checked)
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

                {signIn.error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                    <p className='text-sm text-red-600'>
                      Invalid email or password
                    </p>
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={signIn.isPending}
                  className='h-12 w-full'
                >
                  {signIn.isPending ? 'Signing in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value='signup'>
              <form onSubmit={signUp.handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Input
                    type='text'
                    placeholder='Name'
                    value={signUp.data.name}
                    onChange={(e) => signUp.updateField('name', e.target.value)}
                    className={cn(
                      'h-12',
                      signUp.errors.name && 'border-red-500'
                    )}
                  />
                  {signUp.errors.name && (
                    <p className='text-xs text-red-500'>{signUp.errors.name}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={signUp.data.email}
                    onChange={(e) =>
                      signUp.updateField('email', e.target.value)
                    }
                    className={cn(
                      'h-12',
                      signUp.errors.email && 'border-red-500'
                    )}
                  />
                  {signUp.errors.email && (
                    <p className='text-xs text-red-500'>
                      {signUp.errors.email}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Input
                    type='tel'
                    placeholder='Phone Number'
                    value={signUp.data.phone}
                    onChange={(e) =>
                      signUp.updateField('phone', e.target.value)
                    }
                    className={cn(
                      'h-12',
                      signUp.errors.phone && 'border-red-500'
                    )}
                  />
                  {signUp.errors.phone && (
                    <p className='text-xs text-red-500'>
                      {signUp.errors.phone}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={signUp.showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      value={signUp.data.password}
                      onChange={(e) =>
                        signUp.updateField('password', e.target.value)
                      }
                      className={cn(
                        'h-12 pr-10',
                        signUp.errors.password && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={signUp.togglePasswordVisibility}
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
                    >
                      {signUp.showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {signUp.errors.password && (
                    <p className='text-xs text-red-500'>
                      {signUp.errors.password}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <div className='relative'>
                    <Input
                      type={signUp.showConfirmPassword ? 'text' : 'password'}
                      placeholder='Confirm Password'
                      value={signUp.data.confirmPassword}
                      onChange={(e) =>
                        signUp.updateField('confirmPassword', e.target.value)
                      }
                      className={cn(
                        'h-12 pr-10',
                        signUp.errors.confirmPassword && 'border-red-500'
                      )}
                    />
                    <button
                      type='button'
                      onClick={signUp.toggleConfirmPasswordVisibility}
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-700'
                    >
                      {signUp.showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {signUp.errors.confirmPassword && (
                    <p className='text-xs text-red-500'>
                      {signUp.errors.confirmPassword}
                    </p>
                  )}
                </div>

                {signUp.error && (
                  <div className='rounded-lg border border-red-200 bg-red-50 p-3'>
                    <p className='text-sm text-red-600'>
                      Registration failed. Please try again.
                    </p>
                  </div>
                )}

                <Button
                  type='submit'
                  disabled={signUp.isPending}
                  className='h-12 w-full'
                >
                  {signUp.isPending ? 'Creating account...' : 'Register'}
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
