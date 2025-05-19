import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const photoArchiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'albums',
        loadComponent: () =>
          import('./album-grid/album-grid.component').then(
            (m) => m.AlbumGridComponent,
          ),
      },
      { path: '', redirectTo: 'albums', pathMatch: 'full' },
    ],
  },
];
