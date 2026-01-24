'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export function AuthHeader() {
  const router = useRouter();

  return (
    <>
      {/* Back Button */}
      <Button
        variant='link'
        onClick={() => router.push(ROUTES.HOME)}
        className='flex items-center space-x-2 text-neutral-600 hover:text-neutral-800'
      >
        <ArrowLeft size={20} />
        <span className='text-sm font-medium'>Back</span>
      </Button>

      {/* Logo and Welcome Text */}
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
          <h2 className='display-sm-extrabold text-foreground'>Welcome Back</h2>
          <p className='text-muted-foreground text-sm'>
            Good to see you again! Let's eat
          </p>
        </div>
      </div>
    </>
  );
}
