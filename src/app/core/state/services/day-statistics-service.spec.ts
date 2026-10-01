import { TestBed } from '@angular/core/testing';

import { DayStatisticsService } from './day-statistics-service';

describe('DayStatisticsService', () => {
  let service: DayStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
