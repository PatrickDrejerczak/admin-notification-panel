import { Component, inject } from '@angular/core';
import { NotificationListComponent } from './ui/notification-list/notification-list.component';
import { NotificationService } from '../shared/data-access/notification.service';

@Component({
  selector: 'app-admin-panel',
  imports: [NotificationListComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export default class AdminPanelComponent {
  notificationService = inject(NotificationService);
}
