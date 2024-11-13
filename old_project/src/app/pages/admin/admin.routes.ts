import { Routes } from "@angular/router";

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'usuarios',
                loadComponent: () => import('./users/users.component').then(module => module.UsersComponent)
            },
            {
                path: 'salas',
                loadComponent: () => import('./rooms/rooms.component').then(module => module.RoomsComponent)
            },
            {
                path: 'blog',
                loadComponent: () => import('./blog/blog.component').then(module => module.BlogComponent)
            },
            {
                path: 'logs',
                loadComponent: () => import('./logs/logs.component').then(module => module.LogsComponent)
            }
        ]
    }
];