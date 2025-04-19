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

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(LOCAL_STORAGE);

  loadNotifications() {
    const notifications = this.storage.getItem('notifications');
    return of(
      notifications ? (JSON.parse(notifications) as Notification[]) : []
    );
  }

  loadUserNotifications() {
    const userNotifications = this.storage.getItem('userNotifications');
    return of(
      userNotifications ? (JSON.parse(userNotifications) as Notification[]) : []
    );
  }

  saveNotifications(notifications: Notification[]) {
    this.storage.setItem('notifications', JSON.stringify(notifications));
  }

  saveUserNotifications(userNotifications: Notification[]) {
    this.storage.setItem(
      'userNotifications',
      JSON.stringify(userNotifications)
    );
  }
}
