import { TestBed } from '@angular/core/testing';

import { JSONValidationService } from './jsonvalidation-service';

describe('JSONValidationService', () => {
  let service: JSONValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
