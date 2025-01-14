import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/search-make/search-make.component').then(
        (m) => m.SearchMakeComponent
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./pages/make-detail/make-detail.component').then(
        (m) => m.MakeDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
