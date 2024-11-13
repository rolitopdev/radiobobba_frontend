import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(module => module.HomeComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then(module => module.AdminComponent),
        canActivate: [authGuard],
        children: []
    },
    {
        path: 'dj',
        loadComponent: () => import('./pages/dj/dj.component').then(module => module.DjComponent),
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(module => module.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(module => module.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];