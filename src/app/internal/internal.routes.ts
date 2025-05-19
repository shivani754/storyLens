import { Routes } from '@angular/router';

export const internalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blogs',
        loadComponent: () =>
          import('./blog/blog-list/blog-list.component').then(
            (m) => m.BlogListComponent,
          ),
      },
      { path: '', redirectTo: 'blogs', pathMatch: 'full' },
    ],
  },
];
