import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StorageService } from '../shared/data-access/storage.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  formBuilder = inject(FormBuilder);
  storageService = inject(StorageService);
  errorMessage = signal<string>('');
  private router = inject(Router);

  loginForm = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (
        (username === 'user' && password === 'user') ||
        (username === 'admin' && password === 'admin')
      ) {
        this.storageService.saveUserRole(username);
        this.router.navigate(['/notifications']);
      } else {
        this.errorMessage.set('Invalid username or password.');
      }
    } else {
      this.errorMessage.set('Please fill in all required fields correctly.');
    }
  }
}
