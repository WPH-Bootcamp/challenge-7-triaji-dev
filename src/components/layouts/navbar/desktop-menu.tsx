'use client';

import { useAuth } from '@/features/auth/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarWithInitials } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import UserDropdownContent from './user-dropdown-content';

interface DesktopMenuProps {
  isScrolled?: boolean;
}

function DesktopMenu({ isScrolled = false }: DesktopMenuProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='hidden md:block'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'flex cursor-pointer items-center gap-3 space-x-2 rounded-md px-3 transition-transform duration-200 hover:scale-102 focus:scale-95 focus:ring-0 focus:outline-none active:scale-95',
              isScrolled ? 'text-foreground' : 'text-white'
            )}
          >
            <div className='flex cursor-pointer items-center justify-center transition-transform hover:scale-110'>
              <AvatarWithInitials
                src={user?.avatar}
                alt={user?.name || 'Avatar'}
                name={user?.name}
                size='lg'
                className='shadow-[0_2px_12px_rgba(0,0,0,0.1)]'
                isScrolled={isScrolled}
              />
            </div>

            <div className='text-md-custom cursor-pointer font-bold transition-transform hover:scale-110'>
              {user?.name || 'User'}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-[197px]' align='end' sideOffset={5}>
          <UserDropdownContent />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DesktopMenu;
