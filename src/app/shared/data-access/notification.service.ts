import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  AddNotification,
  NotificationSentStatus,
  EditNotification,
  Notification,
  DeleteNotification,
} from '../interfaces/notification';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { v4 as uuidv4 } from 'uuid';

export interface NotificationsState {
  notifications: Notification[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private storageService = inject(StorageService);

  // state
  private state = signal<NotificationsState>({
    notifications: [],
    loaded: false,
    error: null,
  });

  //selectors
  notifications = computed(() => this.state().notifications);
  userNotifications = computed(() =>
    this.state().notifications.filter(
      (notification) => notification.sent === true
    )
  );
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  //sources
  private notificationsLoaded$ = this.storageService.loadNotifications();
  add$ = new Subject<AddNotification>();
  edit$ = new Subject<EditNotification>();
  delete$ = new Subject<DeleteNotification>();
  sent$ = new Subject<NotificationSentStatus>();

  constructor() {
    // reducers
    this.notificationsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (notifications) =>
        this.state.update((state) => ({
          ...state,
          notifications,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    this.add$.pipe(takeUntilDestroyed()).subscribe((notification) =>
      this.state.update((state) => ({
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...notification,
            id: uuidv4(),
          },
        ],
      }))
    );

    this.delete$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        ),
      }))
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === update.id
            ? { ...notification, ...update.data }
            : notification
        ),
      }))
    );

    this.sent$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === update.id
            ? { ...notification, sent: update.sent }
            : notification
        ),
      }))
    );

    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveNotifications(this.notifications());
      }
    });
  }
}
