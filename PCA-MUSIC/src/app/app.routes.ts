import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { IntroGuard } from './guards/intro.guard';

export const routes: Routes = [
  { path: 'home', component: HomePage, canActivate: [IntroGuard] },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then((m) => m.IntroPage),
  },
];
