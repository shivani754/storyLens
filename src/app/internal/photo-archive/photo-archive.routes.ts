import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const photoArchiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'albums',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./album-grid/album-grid.component').then((m) => m.AlbumGridComponent),
          },
          {
            path: ':albumId',
            loadComponent: () =>
              import('./album-photos/album-photos.component').then((m) => m.AlbumPhotosComponent),
          },
        ],
      },
      { path: '', redirectTo: 'albums', pathMatch: 'full' },
    ],
  },
];
