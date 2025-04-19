import { Component, input } from '@angular/core';
import { Notification } from '../../../shared/interfaces/notification';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification-list',
  imports: [RouterLink],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  notifications = input.required<Notification[]>();
}
