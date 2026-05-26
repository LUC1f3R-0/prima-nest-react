import { Routes } from '@angular/router';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./company-shell.component').then((m) => m.CompanyShellComponent),

    children: [
      { path: '', redirectTo: 'find-us', pathMatch: 'full' },
      {
        path: 'career',
        loadComponent: () => import('./career/career.component').then((m) => m.CareerComponent),
      },
      {
        path: 'find-us',
        loadComponent: () => import('./find-us/find-us.component').then((m) => m.FindUsComponent),
      },
      {
        path: 'gallery',
        loadComponent: () => import('./gallery/gallery.component').then((m) => m.GalleryComponent),
      },
    ],
  },
];
