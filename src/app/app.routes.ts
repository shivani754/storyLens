import { Routes } from '@angular/router';
import { externalRoutes } from './external/external.routes';
import { internalRoutes } from './internal/internal.routes';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./external/external.component').then((m) => m.ExternalComponent),
    children: externalRoutes,
  },
  {
    path: 'internal',
    loadComponent: () =>
      import('./internal/internal.component').then((m) => m.InternalComponent),
    children: internalRoutes,
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
