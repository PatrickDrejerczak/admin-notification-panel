import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { NotificationListComponent } from './ui/notification-list/notification-list.component';
import { NotificationService } from '../shared/data-access/notification.service';
import { Notification } from '../shared/interfaces/notification';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { NotificationFormComponent } from '../shared/ui/notification-form/notification-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/data-access/snackbar.service';

@Component({
  selector: 'app-admin-panel',
  imports: [
    NotificationListComponent,
    ModalComponent,
    ReactiveFormsModule,
    NotificationFormComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export default class AdminPanelComponent {
  router = inject(Router);
  snackbarService = inject(SnackbarService);
  notificationService = inject(NotificationService);
  notificationFormComponent = viewChild<NotificationFormComponent | undefined>(
    NotificationFormComponent
  );
  notificationBeingEdited = signal<Partial<Notification> | null>(null);
  notificationForm = signal(
    this?.notificationFormComponent()?.notificationForm
  );

  constructor() {
    effect(() => {
      const notification = this.notificationBeingEdited();
      const form = this.notificationFormComponent()?.notificationForm;

      if (form) {
        if (!notification) {
          form.reset();
        } else {
          form.patchValue({
            icon: notification.icon,
            text: notification.text,
            metaData: notification.metaData,
            link: notification.link,
          });
        }
      }
    });
  }
}
