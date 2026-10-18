import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayQuestionsComponent } from './day-questions-component';

describe('DayQuestionsComponent', () => {
  let component: DayQuestionsComponent;
  let fixture: ComponentFixture<DayQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayQuestionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayQuestionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
