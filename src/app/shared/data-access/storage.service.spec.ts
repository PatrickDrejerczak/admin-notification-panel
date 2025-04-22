import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    jest.clearAllMocks();

    service = TestBed.inject(StorageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('loadNotifications()', () => {
    it('should return an observable of whatever data is stored on the "notifications" key', () => {
      const testData = [{}, {}];
      const getItem = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(JSON.stringify(testData));

      const observerSpy = subscribeSpyTo(service.loadNotifications());

      expect(observerSpy.getLastValue()).toEqual(testData);
      expect(getItem).toHaveBeenCalledWith('notifications');
      expect(getItem).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if value is null in storage', () => {
      const getItem = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(null);

      const observerSpy = subscribeSpyTo(service.loadNotifications());

      expect(observerSpy.getLastValue()).toEqual([]);
      expect(getItem).toHaveBeenCalledWith('notifications');
      expect(getItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveNotifications()', () => {
    it('should call setItem of local storage on notifications key with supplied data', () => {
      const setItem = jest.spyOn(Storage.prototype, 'setItem');

      const testNotifications = [{}, {}] as any;

      service.saveNotifications(testNotifications);

      expect(setItem).toHaveBeenCalledWith(
        'notifications',
        JSON.stringify(testNotifications)
      );
    });
  });

  describe('loadUserRole()', () => {
    it('should return an observable of whatever data is stored on the "userRole" key', () => {
      const testData = 'admin';
      const getItem = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(testData);

      const observerSpy = subscribeSpyTo(service.loadUserRole());

      expect(observerSpy.getLastValue()).toEqual(testData);
      expect(getItem).toHaveBeenCalledWith('userRole');
      expect(getItem).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if value is null in storage', () => {
      const getItem = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(null);

      const observerSpy = subscribeSpyTo(service.loadUserRole());

      expect(observerSpy.getLastValue()).toEqual('');
      expect(getItem).toHaveBeenCalledWith('userRole');
      expect(getItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveUserRole()', () => {
    it('should call setItem of session storage on userRole key with supplied data', () => {
      const setItem = jest.spyOn(Storage.prototype, 'setItem');

      const testUserRole = 'admin';

      service.saveUserRole(testUserRole);

      expect(setItem).toHaveBeenCalledWith('userRole', testUserRole);
    });
  });

  describe('logut()', () => {
    it('should call setItem of session storage on userRole key with an empty string', () => {
      const setItem = jest.spyOn(Storage.prototype, 'setItem');

      const emptyUserRole = '';

      service.logOut();

      expect(setItem).toHaveBeenCalledWith('userRole', emptyUserRole);
    });
  });
});
