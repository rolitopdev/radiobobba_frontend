import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

    const router = inject(Router); // Inyectamos el Router

    // Obtener los valores de localStorage
    const jwtToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Validar que ambos elementos existen
    if (jwtToken && user) {
        return true; // Permite el acceso
    } else {
        // Si alguno no existe, redirige o bloquea el acceso
        router.navigate(['/']);
        return false;
    }
};
