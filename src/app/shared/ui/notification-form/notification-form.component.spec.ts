import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationFormComponent } from './notification-form.component';

describe('NotificationFormComponent', () => {
  let component: NotificationFormComponent;
  let fixture: ComponentFixture<NotificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Form');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component['notificationForm'].get('icon')?.value).toBe('');
    expect(component['notificationForm'].get('text')?.value).toBe('');
    expect(component['notificationForm'].get('metaData')?.value).toBe('');
    expect(component['notificationForm'].get('link')?.value).toBe('');
    expect(component['notificationForm'].valid).toBe(false);
  });

  it('should mark controls as touched and invalid if form is submitted with invalid values', () => {
    component.onSubmit();
    expect(component['notificationForm'].get('icon')?.touched).toBe(true);
    expect(component['notificationForm'].get('text')?.touched).toBe(true);
    expect(component['notificationForm'].get('metaData')?.touched).toBe(true);
    expect(component['notificationForm'].get('link')?.touched).toBe(true);
    expect(component['notificationForm'].invalid).toBe(true);
  });

  describe('form validation', () => {
    it('should be invalid if icon is empty', () => {
      component['notificationForm'].patchValue({ icon: '' });
      expect(component['notificationForm'].get('icon')?.invalid).toBe(true);
    });

    it('should be invalid if text is empty', () => {
      component['notificationForm'].patchValue({ text: '' });
      expect(component['notificationForm'].get('text')?.invalid).toBe(true);
    });

    it('should be invalid if text is shorter than 3 characters', () => {
      component['notificationForm'].patchValue({ text: 'ab' });
      expect(component['notificationForm'].get('text')?.invalid).toBe(true);
    });

    it('should be invalid if text is longer than 30 characters', () => {
      component['notificationForm'].patchValue({ text: 'a'.repeat(31) });
      expect(component['notificationForm'].get('text')?.invalid).toBe(true);
    });

    it('should be invalid if metaData is empty', () => {
      component['notificationForm'].patchValue({ metaData: '' });
      expect(component['notificationForm'].get('metaData')?.invalid).toBe(true);
    });

    it('should be invalid if metaData is shorter than 3 characters', () => {
      component['notificationForm'].patchValue({ metaData: 'ab' });
      expect(component['notificationForm'].get('metaData')?.invalid).toBe(true);
    });

    it('should be invalid if metaData is longer than 40 characters', () => {
      component['notificationForm'].patchValue({ metaData: 'a'.repeat(41) });
      expect(component['notificationForm'].get('metaData')?.invalid).toBe(true);
    });

    it('should be valid if link is empty', () => {
      component['notificationForm'].patchValue({ link: '' });
      expect(component['notificationForm'].get('link')?.valid).toBe(true);
    });

    it('should be invalid if link is not a valid URL', () => {
      component['notificationForm'].patchValue({ link: 'invalid-url' });
      expect(component['notificationForm'].get('link')?.invalid).toBe(true);
    });

    it('should be valid if link is a valid https URL', () => {
      component['notificationForm'].patchValue({ link: 'https://example.com' });
      expect(component['notificationForm'].get('link')?.valid).toBe(true);
    });

    it('should be valid if all required fields are filled', () => {
      component['notificationForm'].patchValue({
        icon: 'info',
        text: 'Valid Title',
        metaData: 'Valid Description',
      });
      expect(component['notificationForm'].valid).toBe(true);
    });
  });

  describe('onSubmit', () => {
    let saveSpy: jest.SpyInstance;
    let closeSpy: jest.SpyInstance;

    beforeEach(() => {
      saveSpy = jest.spyOn(component.save, 'emit');
      closeSpy = jest.spyOn(component.close, 'emit');
    });

    it('should emit save and close events if the form is valid', () => {
      component['notificationForm'].patchValue({
        icon: 'info',
        text: 'Valid Title',
        metaData: 'Valid Description',
      });
      component.onSubmit();
      expect(component['notificationForm'].valid).toBe(true);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should mark controls as touched if the form is invalid', () => {
      component.onSubmit();
      expect(component['notificationForm'].get('icon')?.touched).toBe(true);
      expect(component['notificationForm'].get('text')?.touched).toBe(true);
      expect(component['notificationForm'].get('metaData')?.touched).toBe(true);
      expect(component['notificationForm'].get('link')?.touched).toBe(true);
      expect(saveSpy).not.toHaveBeenCalled();
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });
});
