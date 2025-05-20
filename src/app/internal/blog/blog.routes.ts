import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const blogRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./blog-list/blog-list.component').then((m) => m.BlogListComponent),
      },
      {
        path: ':postId',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./blog-details/blog-details.component').then((m) => m.BlogDetailsComponent),
          },
          {
            path: 'comment',
            canActivate: [authGuard],
            loadComponent: () =>
              import('./add-comment/add-comment.component').then((m) => m.AddCommentComponent),
          },
        ],
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
