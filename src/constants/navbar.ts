import { ROUTES } from './routes';

export type MenuItemType = 'item' | 'separator' | 'logout';

export interface NavMenuItem {
  type: MenuItemType;
  label?: string;
  href?: string;
  icon?: string;
  className?: string;
}

export const AUTHENTICATED_MENU_ITEMS: NavMenuItem[] = [
  { type: 'item', label: 'Home', href: ROUTES.HOME, icon: 'Home' },
  {
    type: 'item',
    label: 'Restaurants',
    href: ROUTES.RESTAURANTS,
    icon: 'Restaurant',
  },
  { type: 'item', label: 'Cart', href: ROUTES.CART, icon: 'Cart' },
  { type: 'item', label: 'Orders', href: ROUTES.ORDERS, icon: 'Orders' },
  { type: 'separator' },
  { type: 'logout', label: 'Sign Out', icon: 'Logout' },
];

export const GUEST_MENU_ITEMS: NavMenuItem[] = [
  { type: 'item', label: 'Sign In', href: ROUTES.AUTH_LOGIN, icon: 'SignIn' },
  {
    type: 'item',
    label: 'Sign Up',
    href: ROUTES.AUTH_REGISTER,
    icon: 'SignUp',
  },
  { type: 'separator' },
  { type: 'item', label: 'Home', href: ROUTES.HOME, icon: 'Home' },
  {
    type: 'item',
    label: 'Restaurants',
    href: ROUTES.RESTAURANTS,
    icon: 'Restaurant',
  },
];
