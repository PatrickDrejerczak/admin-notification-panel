import { Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';
import { NotificationsGuard } from './shared/guards/notifications.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component'),
    canMatch: [NotificationsGuard],
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin-panel/admin-panel.component'),
    canMatch: [AdminGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
