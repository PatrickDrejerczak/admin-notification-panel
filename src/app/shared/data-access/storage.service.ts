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
    try {
      const notifications = this.localStorage.getItem('notifications');
      return of(
        notifications ? (JSON.parse(notifications) as Notification[]) : []
      );
    } catch (error) {
      console.error('Error loading notifications from local storage:', error);
      return of([]);
    }
  }

  loadUserRole() {
    try {
      const userRole = this.sessionStorage.getItem('userRole');
      return of(userRole ? userRole : '');
    } catch (error) {
      console.error('Error loading user role from session storage:', error);
      return of('');
    }
  }

  saveNotifications(notifications: Notification[]) {
    try {
      this.localStorage.setItem('notifications', JSON.stringify(notifications));
      return of(true);
    } catch (error) {
      console.error('Error saving notifications to local storage:', error);
      return of(false);
    }
  }

  saveUserRole(userRole: string) {
    try {
      this.sessionStorage.setItem('userRole', userRole);
      return of(true);
    } catch (error) {
      console.error('Error saving user role to session storage:', error);
      return of(false);
    }
  }

  logOut() {
    try {
      this.sessionStorage.setItem('userRole', '');
      return of(true);
    } catch (error) {
      console.error('Error during logout (session storage):', error);
      return of(false);
    }
  }
}
