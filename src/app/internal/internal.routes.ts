import { Routes } from '@angular/router';
import { blogRoutes } from './blog/blog.routes';
import { photoArchiveRoutes } from './photo-archive/photo-archive.routes';

export const internalRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blogs',
        children: blogRoutes,
      },
      {
        path: 'photo-archive',
        children: photoArchiveRoutes,
      },
      { path: '', redirectTo: 'blogs', pathMatch: 'full' },
    ],
  },
];
