import { TestBed } from '@angular/core/testing';
import {
  Router,
  Route,
  UrlSegment,
  UrlTree,
  CanMatchFn,
} from '@angular/router';
import { of } from 'rxjs';
import { NotificationsGuard } from './notifications.guard';
import { StorageService } from '../data-access/storage.service';

describe('NotificationsGuard', () => {
  let guard: CanMatchFn;
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
            createUrlTree: jest.fn(),
          },
        },
      ],
    });
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    guard = TestBed.runInInjectionContext(() => NotificationsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user role is "admin"', (done) => {
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of('admin'));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe(
        (canMatch: boolean | UrlTree) => {
          expect(canMatch).toBe(true);
          expect(router.createUrlTree).not.toHaveBeenCalled();
          done();
        }
      );
    });
  });

  it('should return true if the user role is "user"', (done) => {
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of('user'));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe(
        (canMatch: boolean | UrlTree) => {
          expect(canMatch).toBe(true);
          expect(router.createUrlTree).not.toHaveBeenCalled();
          done();
        }
      );
    });
  });

  it('should return a UrlTree navigating to /login if the user role is neither "admin" nor "user"', (done) => {
    const mockUrlTree: UrlTree = {} as UrlTree;
    (router.createUrlTree as jest.Mock).mockReturnValue(mockUrlTree);
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of('guest'));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe(
        (canMatch: boolean | UrlTree) => {
          expect(canMatch).toBe(mockUrlTree);
          expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
          done();
        }
      );
    });
  });

  it('should return a UrlTree navigating to /login if loadUserRole emits null', (done) => {
    const mockUrlTree: UrlTree = {} as UrlTree;
    (router.createUrlTree as jest.Mock).mockReturnValue(mockUrlTree);
    (storageService.loadUserRole as jest.Mock).mockReturnValue(of(null));
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe(
        (canMatch: boolean | UrlTree) => {
          expect(canMatch).toBe(mockUrlTree);
          expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
          done();
        }
      );
    });
  });

  it('should handle errors from loadUserRole and return a UrlTree navigating to /login', (done) => {
    const mockUrlTree: UrlTree = {} as UrlTree;
    (router.createUrlTree as jest.Mock).mockReturnValue(mockUrlTree);
    (storageService.loadUserRole as jest.Mock).mockReturnValue(
      of(new Error('Failed to load role'))
    );
    const mockRoute = {} as Route;
    const mockSegments = [] as UrlSegment[];

    TestBed.runInInjectionContext(() => {
      (guard(mockRoute, mockSegments) as any).subscribe(
        (canMatch: boolean | UrlTree) => {
          expect(canMatch).toBe(mockUrlTree);
          expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
          done();
        }
      );
    });
  });
});
