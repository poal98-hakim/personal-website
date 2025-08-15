import type { HeaderVM, NavigationItem } from './Header.model';

export class HeaderPresenter {
  public getNavigationItems(pathname: string): NavigationItem[] {
    return [
      {
        label: 'Home',
        href: '/',
        isActive: pathname === '/',
      },
      {
        label: 'Projects',
        href: '/projects',
        isActive: pathname.startsWith('/projects'),
      },
      {
        label: 'About',
        href: '/about',
        isActive: pathname.startsWith('/about'),
      },
      {
        label: 'Contact',
        href: '/contact',
        isActive: pathname.startsWith('/contact'),
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
