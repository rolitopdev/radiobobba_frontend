import { Routes } from "@angular/router";

export const DjRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'panel',
                loadComponent: () => import('./panel/panel.component').then(module => module.PanelComponent)
            }
        ]
    }
];