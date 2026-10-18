import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayPracticeComponent } from './day-practice-component';

describe('DayPracticeComponent', () => {
  let component: DayPracticeComponent;
  let fixture: ComponentFixture<DayPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayPracticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayPracticeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
