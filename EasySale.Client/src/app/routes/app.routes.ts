import { Routes } from '@angular/router';
import { HomeComponent } from '../modules/home/page/home/home.component';
import { authGuard } from '../core/guards/auth.guard';
import { RootLayoutComponent } from '../shared/components/root-layout/root-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./home.routes').then((mod) => mod.homeRoutes),
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
