import { TestBed } from '@angular/core/testing';

import { NotificationssssService } from './notificationssss.service';

describe('NotificationssssService', () => {
  let service: NotificationssssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationssssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
