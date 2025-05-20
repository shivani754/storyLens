import { Routes } from '@angular/router';

export const externalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then((m) => m.SignupComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
      },
      { path: '', redirectTo: 'signup', pathMatch: 'full' },
    ],
  },
];
