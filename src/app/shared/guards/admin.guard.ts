import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../data-access/storage.service';
import { map } from 'rxjs/operators';

export const AdminGuard: CanMatchFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  return storageService.loadUserRole().pipe(
    map((role: string) => {
      const isAdmin = role === 'admin';
      const isUser = role === 'user';

      if (!isAdmin && !isUser) {
        router.navigate(['/login']);
      }

      return isAdmin;
    })
  );
};
