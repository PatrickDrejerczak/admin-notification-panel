import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../shared/data-access/storage.service';
import { NotificationService } from '../shared/data-access/notification.service';
import { NotificationCardComponent } from '../shared/ui/notification-card/notification-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notifications',
  imports: [
    RouterLink,
    NotificationCardComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export default class NotificationsComponent implements OnInit {
  storageService = inject(StorageService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  userRole = signal<string>('');
  userNotifications = computed(() =>
    this.notificationService.userNotifications()
  );

  ngOnInit(): void {
    this.storageService.loadUserRole().subscribe((role: string) => {
      this.userRole.set(role);
    });
  }

  handleLogout() {
    this.storageService.logOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
