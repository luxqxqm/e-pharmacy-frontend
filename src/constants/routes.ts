export const ROUTES = {
  home: '/home',
  medicineStore: '/medicine-store',
  medicine: '/medicine',
  product: (id: string) => `/product/${id}`,
  cart: '/cart',
  login: '/login',
  register: '/register',
  features: '/features',
} as const;

export const NAV_LINKS = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.medicineStore, label: 'Medicine store' },
  { href: ROUTES.medicine, label: 'Medicine' },
] as const;

export const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/goITclub/',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/goitclub/',
  },
  {
    label: 'YouTube',
    icon: 'youtube',
    href: 'https://www.youtube.com/c/GoIT',
  },
] as const;

export function isNavLinkActive(href: string, pathname: string): boolean {
  const isSelfOrChild = pathname === href || pathname.startsWith(`${href}/`);

  if (href === ROUTES.medicine) {
    return isSelfOrChild || pathname.startsWith('/product/');
  }

  return isSelfOrChild;
}
