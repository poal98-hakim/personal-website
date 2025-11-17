import type { HeaderVM, NavigationItem } from './Header.model';

export class HeaderPresenter {
  public getNavigationItems(pathname: string): NavigationItem[] {
    // Normalize pathname to handle trailing slashes
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

    return [
      {
        label: 'Home',
        href: '/',
        isActive: normalizedPath === '/' || normalizedPath === '',
      },
      {
        label: 'Projects',
        href: '/projects',
        isActive: normalizedPath.startsWith('/projects'),
      },
      {
        label: 'About',
        href: '/about',
        isActive: normalizedPath.startsWith('/about'),
      },
      {
        label: 'Contact',
        href: '/contact',
        isActive: normalizedPath.startsWith('/contact'),
      },
    ];
  }

  public getViewModel(pathname: string): HeaderVM {
    return {
      navigationItems: this.getNavigationItems(pathname),
      logoText: 'Hakim Abdelcadir',
      logoHref: '/',
    };
  }
}
