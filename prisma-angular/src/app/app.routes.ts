import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.routes').then((m) => m.PUBLIC_ROUTES) },
  {
    path: 'company',
    loadChildren: () => import('./company/company.routes').then((m) => m.COMPANY_ROUTES),
  },
];
