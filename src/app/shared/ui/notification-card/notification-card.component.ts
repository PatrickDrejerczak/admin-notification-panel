import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationSentStatus } from '../../interfaces/notification';

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
  dismissed = output<NotificationSentStatus>();
  icon = input.required<string>();
  text = input.required<string>();
  metadata = input.required<string>();
  link = input.required<string>();
  disabled = input.required<boolean>();
  id = input<string>();
}
