import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/page/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./modules/auth/page/sign-in/sign-in.component').then(
        (mod) => mod.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./modules/auth/page/sign-up/sign-up.component').then(
        (mod) => mod.SignUpComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./modules/not-found/page/not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];
