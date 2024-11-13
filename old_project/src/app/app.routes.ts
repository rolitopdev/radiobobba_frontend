import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(module => module.HomeComponent)
      }
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [authGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then((m) => m.AdminRoutes),
        canActivate: [authGuard]
      },
      {
        path: 'dj',
        loadChildren: () => import('./pages/dj/dj.routes').then((m) => m.DjRoutes),
        canActivate: [authGuard]
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then((m) => m.AuthenticationRoutes),
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: 'authentication/error',
  // },
];
