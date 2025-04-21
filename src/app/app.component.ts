import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from './shared/data-access/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  storageService = inject(StorageService);
  router = inject(Router);
  userRole = signal<string>('');

  ngOnInit(): void {
    this.storageService.loadUserRole().subscribe((role: string) => {
      this.userRole.set(role);
    });

    if (this.userRole() === 'admin' || this.userRole() === 'user') {
      this.router.navigate(['./notifications']);
    }
  }
}
