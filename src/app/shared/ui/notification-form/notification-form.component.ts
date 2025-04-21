import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notification-form',
  imports: [
    ReactiveFormsModule,
    NotificationCardComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.scss',
})
export class NotificationFormComponent {
  title = input.required<string>();
  formBuilder = inject(FormBuilder);
  save = output();
  close = output();

  notificationForm = this.formBuilder.nonNullable.group({
    icon: ['', [Validators.required]],
    text: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    metaData: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(40)],
    ],
    link: [
      '',
      [
        Validators.pattern(
          /^https:\/\/([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\.-]*)*\/?$/
        ),
      ],
    ],
  });

  onSubmit() {
    if (this.notificationForm.valid) {
      this.save.emit();
      this.close.emit();
    } else {
      Object.keys(this.notificationForm.controls).forEach((key) => {
        this.notificationForm.get(key)?.markAsTouched();
      });
    }
  }
}
