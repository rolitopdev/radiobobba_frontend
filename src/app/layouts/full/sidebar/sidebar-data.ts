import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Inicio',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'Admin',
  },
  {
    displayName: 'Usuarios',
    iconName: 'users',
    bgcolor: 'accent',
    route: '/admin/usuarios',
  },
  {
    displayName: 'Salas',
    iconName: 'home',
    bgcolor: 'warning',
    route: '/admin/salas',
  },
  {
    displayName: 'Blog',
    iconName: 'brand-blogger',
    bgcolor: 'success',
    route: '/admin/blog',
  },
  {
    displayName: 'Logs',
    iconName: 'file-type-sql',
    bgcolor: 'error',
    route: '/admin/logs',
  },
  {
    navCap: "DJ'S",
  },
  {
    displayName: 'Panel',
    iconName: 'music',
    bgcolor: 'primary',
    route: '/dj/panel',
  }
];
