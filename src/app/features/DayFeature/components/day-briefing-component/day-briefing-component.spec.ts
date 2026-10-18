import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBriefingComponent } from './day-briefing-component';

describe('DayBriefingComponent', () => {
  let component: DayBriefingComponent;
  let fixture: ComponentFixture<DayBriefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayBriefingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayBriefingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
