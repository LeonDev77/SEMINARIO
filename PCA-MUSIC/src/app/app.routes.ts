import { Routes } from '@angular/router';
import { HomePage } from './views/home/home.page';
import { IntroGuard } from './guards/intro.guard';
import { LoginPage } from './views/login/login.page';
import { IntroPage } from './views/intro/intro.page';
import { RegisterPage } from './views/register/register.page';
import { AuthGuard } from './guards/auth.guard';
import { MenuPage } from './views/menu/menu.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    component: IntroPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'home',
        component: HomePage,
        canActivate: [IntroGuard, AuthGuard],
      },
    ],
  },
];
