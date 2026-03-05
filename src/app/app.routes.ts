import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // Ленивая загрузка (рекомендуется для Angular 21)
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
