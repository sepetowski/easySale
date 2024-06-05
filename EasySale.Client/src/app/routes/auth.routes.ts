import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('../modules/auth/page/sign-in/sign-in.component').then(
        (mod) => mod.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('../modules/auth/page/sign-up/sign-up.component').then(
        (mod) => mod.SignUpComponent
      ),
  },
];
