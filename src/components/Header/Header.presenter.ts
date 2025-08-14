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
        isActive: pathname === '/projects',
      },
      {
        label: 'About',
        href: '/about',
        isActive: pathname === '/about',
      },
      {
        label: 'Contact',
        href: '/contact',
        isActive: pathname === '/contact',
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
