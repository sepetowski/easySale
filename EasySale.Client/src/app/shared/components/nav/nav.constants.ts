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
    href: '/',
    icon: 'pi-heart',
  },
  {
    name: 'Messages',
    href: '/',
    icon: 'pi-comments',
    aditionalInfomration: true,
    aditionalInfomrationNumber: 3,
  },
  {
    name: 'Wallet',
    href: '/',
    icon: 'pi-wallet',
  },
  {
    name: 'Buying',
    href: '/',
    icon: 'pi-shopping-bag',
  },
  {
    name: 'Selling',
    href: '/',
    icon: 'pi-dollar',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'pi-cog',
  },
];
