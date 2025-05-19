import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-required-modal',
  imports: [],
  templateUrl: './login-required-modal.component.html',
  styleUrl: './login-required-modal.component.css',
})
export class LoginRequiredModalComponent {
  @Input() close!: () => void;

  constructor(private router: Router) {}

  login() {
    this.router
      .navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.url },
      })
      .then(() => {
        if (this.close) this.close(); // Dismiss modal after navigation
      });
  }
}
