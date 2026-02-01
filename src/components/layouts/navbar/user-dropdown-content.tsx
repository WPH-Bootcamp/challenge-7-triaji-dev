'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/use-auth';
import { ROUTES } from '@/constants/routes';
import { USER_DROPDOWN_ITEMS, type NavMenuItem } from '@/constants/navbar';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MenuIcons } from './menu-icons';
import { AvatarWithInitials } from '@/components/ui/avatar';

const IconMap: Record<string, React.FC> = {
  Home: MenuIcons.Home,
  Restaurant: MenuIcons.Restaurant,
  Cart: MenuIcons.Cart,
  Orders: MenuIcons.Orders,
  DeliveryAddress: MenuIcons.DeliveryAddress,
  Logout: MenuIcons.Logout,
};

interface UserDropdownContentProps {
  onClose?: () => void;
}

function UserDropdownContent({ onClose }: UserDropdownContentProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push(ROUTES.HOME);
      onClose?.();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose?.();
  };

  const renderMenuItem = (item: NavMenuItem, index: number) => {
    if (item.type === 'separator') {
      return <DropdownMenuSeparator key={`sep-${index}`} />;
    }

    const Icon = item.icon ? IconMap[item.icon] : null;

    if (item.type === 'logout') {
      return (
        <DropdownMenuItem
          key={item.label}
          onClick={handleLogout}
          className='cursor-pointer'
        >
          {Icon && <Icon />}
          {item.label}
        </DropdownMenuItem>
      );
    }

    return (
      <DropdownMenuItem
        key={item.label}
        onClick={() => item.href && handleNavigation(item.href)}
        className='cursor-pointer'
      >
        {Icon && <Icon />}
        {item.label}
      </DropdownMenuItem>
    );
  };

  return (
    <>
      <DropdownMenuLabel className='font-normal'>
        <div className='flex items-center gap-4 p-2'>
          <AvatarWithInitials
            src={user?.avatar}
            alt={user?.name || 'Profile'}
            name={user?.name}
            size='lg'
          />
          <p className='text-lg-custom leading-none font-bold'>
            {user?.name || 'User'}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        {USER_DROPDOWN_ITEMS.map((item, index) => renderMenuItem(item, index))}
      </DropdownMenuGroup>
    </>
  );
}

export default UserDropdownContent;
