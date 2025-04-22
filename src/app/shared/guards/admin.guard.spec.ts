import { TestBed } from '@angular/core/testing';
import { Router, Route, UrlSegment } from '@angular/router';
import { of } from 'rxjs';
import { AdminGuard } from './admin.guard';
import { StorageService } from '../data-access/storage.service';

describe('AdminGuard', () => {
  let guard: typeof AdminGuard;
  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StorageService,
          useValue: {
            loadUserRole: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    });
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    guard = TestBed.runInInjectionContext(() => AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true and not navigate if the user role is "admin"', (done) => {
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of('admin'));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe((canMatch: boolean) => {
        expect(canMatch).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });
  });

  it('should return false and navigate to /login if the user role is neither "admin" nor "user"', (done) => {
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of('guest'));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe((canMatch: boolean) => {
        expect(canMatch).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });
  });

  it('should handle errors from loadUserRole and still navigate to /login', (done) => {
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of(null));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe((canMatch: boolean) => {
        expect(canMatch).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    });
  });
});
