export interface HeaderVM {
  navigationItems: NavigationItem[];
  logoText: string;
  logoHref: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive: boolean;
}
