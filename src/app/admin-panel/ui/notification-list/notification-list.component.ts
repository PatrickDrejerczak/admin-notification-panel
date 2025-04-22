import { Component, input, output } from '@angular/core';
import {
  Notification,
  NotificationSentStatus,
} from '../../../shared/interfaces/notification';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notification-list',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  notifications = input.required<Notification[]>();
  delete = output<string>();
  edit = output<Notification>();
  sent = output<NotificationSentStatus>();
}
