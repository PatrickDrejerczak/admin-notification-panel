import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let storageService: StorageService;
  let loadNotificationsSubject: Subject<any>;

  beforeEach(() => {
    loadNotificationsSubject = new Subject();

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {
          provide: StorageService,
          useValue: {
            loadNotifications: jest
              .fn()
              .mockReturnValue(loadNotificationsSubject),
            saveNotifications: jest.fn().mockReturnValue(of(null)),
          },
        },
      ],
    });

    service = TestBed.inject(NotificationService);
    storageService = TestBed.inject(StorageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('source: add$', () => {
    let testData = { icon: 'info', text: 'test', metaData: 'test' };

    beforeEach(() => {
      service.add$.next(testData);
    });

    it('should add the supplied data to the notifications array', () => {
      expect(
        service
          .notifications()
          .find((notification) => notification.text === testData.text)
      ).toBeTruthy();
    });

    it('should not remove other data from the notifications array', () => {
      service.add$.next({ icon: 'info', text: 'anoter', metaData: 'another' });
      expect(service.notifications().length).toEqual(2);
    });
  });

  describe('source: edit$', () => {
    let preEdit = { icon: 'info', text: 'test', metaData: 'test' };
    let postEdit = { icon: 'info', text: 'edited', metaData: 'edited' };

    beforeEach(() => {
      service.add$.next(preEdit);
      const addedNotification = service.notifications()[0];
      service.edit$.next({ id: addedNotification.id, data: { ...postEdit } });
    });

    it('should edit the notification with the supplied data', () => {
      const notification = service.notifications()[0];
      expect(notification).toEqual({ id: notification.id, ...postEdit });
    });
  });

  describe('source: delete$', () => {
    beforeEach(() => {
      service.add$.next({ icon: 'info', text: 'first', metaData: 'first' });
      service.add$.next({ icon: 'info', text: 'second', metaData: 'second' });
      service.add$.next({ icon: 'info', text: 'third', metaData: 'third' });
    });

    it('should delete the notification with the supplied id', () => {
      const testNotification = service.notifications()[0];
      service.delete$.next(testNotification.id);
      expect(
        service
          .notifications()
          .find((notification) => notification.id === testNotification.id)
      ).toBeFalsy();
    });

    it('should NOT remove notifications that do not match the id', () => {
      const testNotification = service.notifications()[0];
      const prevLength = service.notifications().length;
      service.delete$.next(testNotification.id);
      expect(service.notifications().length).toEqual(prevLength - 1);
    });
  });

  describe('source: sent$', () => {
    let notSent = { icon: 'info', text: 'test', metaData: 'test', sent: false };
    let sent = { icon: 'info', text: 'test', metaData: 'test', sent: true };

    beforeEach(() => {
      service.add$.next(notSent);
      const addedNotification = service.notifications()[0];
      service.sent$.next({ id: addedNotification.id, sent: true });
    });

    it('should change the sent flag to true', () => {
      const notification = service.notifications()[0];
      expect(notification).toEqual({ id: notification.id, ...sent });
    });
  });

  describe('source: notificationsLoaded$', () => {
    it('should update notifications state when loadNotifications() emits', () => {
      const testData = [
        { icon: 'info', text: 'first', metaData: 'first' },
        { icon: 'info', text: 'second', metaData: 'second' },
      ];
      loadNotificationsSubject.next(testData);
      expect(service.notifications()).toEqual(testData);
    });

    it('should set loaded flag to true if loaded successfully', () => {
      expect(service.loaded()).toEqual(false);
      loadNotificationsSubject.next([]);
      expect(service.loaded()).toEqual(true);
    });

    it('should set the error state if load fails', () => {
      expect(service.error()).toEqual(null);
      const testError = 'Failed to load notifications:';
      loadNotificationsSubject.error(testError);
      expect(service.error()).toEqual(testError);
    });
  });

  describe('effect: notifications()', () => {
    it('should call saveNotifications method with notifications when notifications() changes', () => {
      loadNotificationsSubject.next([]);
      service.add$.next({ icon: 'info', text: 'test', metaData: 'test' });
      TestBed.flushEffects();
      expect(storageService.saveNotifications).toHaveBeenCalledWith(
        service.notifications()
      );
    });

    it('should NOT call saveNotifications if the loaded flag is false', () => {
      service.add$.next({ icon: 'info', text: 'test', metaData: 'test' });
      TestBed.flushEffects();
      expect(storageService.saveNotifications).not.toHaveBeenCalledWith();
    });
  });
});
