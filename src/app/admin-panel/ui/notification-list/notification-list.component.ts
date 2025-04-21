import { Component, inject, input, output } from '@angular/core';
import { Notification } from '../../../shared/interfaces/notification';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../shared/data-access/notification.service';
import { SnackbarService } from '../../../shared/data-access/snackbar.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notification-list',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  notificationService = inject(NotificationService);
  snackbarService = inject(SnackbarService);
  notifications = input.required<Notification[]>();
  delete = output<string>();
  edit = output<Notification>();
}
