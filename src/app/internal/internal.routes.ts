import { Routes } from '@angular/router';
import { blogRoutes } from './blog/blog.routes';

export const internalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blogs',
        children: blogRoutes,
      },
      { path: '', redirectTo: 'blogs', pathMatch: 'full' },
    ],
  },
];
