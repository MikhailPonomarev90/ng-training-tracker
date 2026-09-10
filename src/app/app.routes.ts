import { Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard(shell)/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'day',
      },
      {
        path: 'day',
        loadComponent: () =>
          import('./features/DayFeature/components/day-page.component/day-page.component').then(
            (m) => m.DayPageComponent,
          ),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/CalendarFeature/components/calendar-page.component/calendar-page.component').then(
            (m) => m.CalendarPageComponent,
          ),
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./features/StatisticsFeature/components/statistics-page.component/statistics-page.component').then(
            (m) => m.StatisticsPageComponent,
          ),
      },
      {
        path: 'learning-plan',
        loadComponent: () =>
          import('./features/LearningPlanFeature/components/learning-plan-page.component/learning-plan-page.component').then(
            (m) => m.LearningPlanPageComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/SettingsFeature/components/settings-page.component/settings-page.component').then(
            (m) => m.SettingsPageComponent,
          ),
      },
    ],
  },
];
