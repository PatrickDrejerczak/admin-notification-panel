import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationService } from '../../data-access/notification.service';
import { SnackbarService } from '../../data-access/snackbar.service';

@Component({
  selector: 'app-notification-card',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
})
export class NotificationCardComponent {
  notificationService = inject(NotificationService);
  snackbarService = inject(SnackbarService);
  icon = input.required<string>();
  text = input.required<string>();
  metadata = input.required<string>();
  link = input.required<string>();
  disabled = input.required<boolean>();
  id = input<string>();
}
