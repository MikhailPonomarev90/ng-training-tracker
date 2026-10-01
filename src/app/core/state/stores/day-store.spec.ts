import { TestBed } from '@angular/core/testing';

import { DayStore } from './day-store';

describe('DayStore', () => {
  let service: DayStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
