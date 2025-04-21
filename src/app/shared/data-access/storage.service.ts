import { Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { of } from 'rxjs';
import { Notification } from '../interfaces/notification';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'window local storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.localStorage
        : ({} as Storage);
    },
  }
);

export const SESSION_STORAGE = new InjectionToken<Storage>(
  'window session storage object',
  {
    providedIn: 'root',
    factory: () => {
      return inject(PLATFORM_ID) === 'browser'
        ? window.sessionStorage
        : ({} as Storage);
    },
  }
);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorage = inject(LOCAL_STORAGE);
  sessionStorage = inject(SESSION_STORAGE);

  loadNotifications() {
    const notifications = this.localStorage.getItem('notifications');
    return of(
      notifications ? (JSON.parse(notifications) as Notification[]) : []
    );
  }

  loadUserNotifications() {
    const userNotifications = this.localStorage.getItem('userNotifications');
    return of(
      userNotifications ? (JSON.parse(userNotifications) as Notification[]) : []
    );
  }

  loadUserRole() {
    const userRole = this.sessionStorage.getItem('userRole');
    return of(userRole ? userRole : '');
  }

  saveNotifications(notifications: Notification[]) {
    this.localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  saveUserNotifications(userNotifications: Notification[]) {
    this.localStorage.setItem(
      'userNotifications',
      JSON.stringify(userNotifications)
    );
  }

  saveUserRole(userRole: string) {
    this.sessionStorage.setItem('userRole', userRole);
    return of(true);
  }

  logOut() {
    this.sessionStorage.setItem('userRole', '');
    return of(true);
  }
}
