import { TestBed } from '@angular/core/testing';

import { TaskLoggerService } from './task-logger-service';

describe('TaskLoggerService', () => {
  let service: TaskLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
