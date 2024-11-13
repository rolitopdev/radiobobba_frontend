import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {

  private intervalId: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.checkTokenExpiration();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  checkTokenExpiration() {
    this.intervalId = setInterval(() => {
      if (this.authService.isLoggedIn()) {
        console.log('El token sigue siendo válido');
      } else {
        console.warn('El token ha expirado. Redirigiendo al login...');
        this.authService.logout(); // Cerrar sesión y redirigir al login
      }
    }, 1000 * 60 * 60 * 24 * 2); // Verifica cada 2 días
  }

}
