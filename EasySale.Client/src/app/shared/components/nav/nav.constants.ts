export interface NavItem {
  name: string;
  href: string;
  icon: string;
  aditionalInfomration?: boolean;
  aditionalInfomrationNumber?: number;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: 'pi-home',
  },
  {
    name: 'Saved',
    href: '/saved',
    icon: 'pi-heart',
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: 'pi-comments',
    aditionalInfomration: true,
    aditionalInfomrationNumber: 3,
  },
  {
    name: 'Wallet',
    href: '/wallet',
    icon: 'pi-wallet',
  },
  {
    name: 'Buying',
    href: '/buying',
    icon: 'pi-shopping-bag',
  },
  {
    name: 'Selling',
    href: '/selling',
    icon: 'pi-dollar',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'pi-cog',
  },
];
