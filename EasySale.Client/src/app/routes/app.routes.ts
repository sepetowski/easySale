import { Routes } from '@angular/router';
import { HomeComponent } from '../modules/home/page/home/home.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    canActivate: [authGuard],
    loadChildren: () => import('./auth.routes').then((mod) => mod.authRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../modules/not-found/page/not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
];
