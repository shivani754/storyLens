import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const modalService = inject(ModalService);
  const creds = localStorage.getItem('userCredentials'); // or any key you're storing
  if (creds) {
    // User is authenticated
    return true;
  } else {
    // Redirect to login
    modalService.openLoginRequiredModal();
    return false;
  }
};
