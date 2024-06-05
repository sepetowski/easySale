import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../modules/home/page/home/home.component').then(
        (mod) => mod.HomeComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('../modules/home/page/settings/settings.component').then(
        (mod) => mod.SettingsComponent
      ),
  },
];
