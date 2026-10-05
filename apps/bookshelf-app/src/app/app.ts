import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  authService = inject(AuthService);
  ready = signal(false);

  constructor() {
    this.authService.refreshToken().subscribe({
      next: (response: any) => {
        this.authService.setAccessToken(response.token);
        this.authService.userName.set(response.name);
        this.ready.set(true);
      },
      error: () => {
        this.ready.set(true);
      }
    });
  }
}
