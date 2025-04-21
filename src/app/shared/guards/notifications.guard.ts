import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { StorageService } from '../data-access/storage.service';
import { map } from 'rxjs/operators';

export const NotificationsGuard: CanMatchFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  return storageService.loadUserRole().pipe(
    map((role: string) => {
      const isAuthorized = role === 'admin' || role === 'user';

      if (isAuthorized) {
        return true;
      }

      return router.createUrlTree(['/login']);
    })
  );
};
