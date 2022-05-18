import { TestBed } from '@angular/core/testing';

import { AdmobFreeService } from './admob-free.service';

describe('AdmobFreeService', () => {
  let service: AdmobFreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmobFreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
