import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlanPageComponent } from './learning-plan-page.component';

describe('LearningPlanPageComponent', () => {
  let component: LearningPlanPageComponent;
  let fixture: ComponentFixture<LearningPlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPlanPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningPlanPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
