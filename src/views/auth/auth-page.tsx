'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/constants';
import { AuthHeader, SignInForm, SignUpForm } from './components';

function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  const tabFromUrl = searchParams.get('tab');
  const activeTab = tabFromUrl === 'signup' ? 'signup' : 'signin';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, router]);

  const handleTabChange = (value: string) => {
    router.push(`${ROUTES.AUTH}?tab=${value}`);
  };

  const handleSignUpSuccess = () => {
    router.push(`${ROUTES.AUTH}?tab=signin`);
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
          <AuthHeader />

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className='grid h-full grid-cols-2 rounded-xl bg-neutral-200 p-1'>
              <TabsTrigger value='signin'>Sign in</TabsTrigger>
              <TabsTrigger value='signup'>Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value='signin'>
              <SignInForm />
            </TabsContent>

            <TabsContent value='signup'>
              <SignUpForm onSuccess={handleSignUpSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
