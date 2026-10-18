import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTheoryComponent } from './day-theory-component';

describe('DayTheoryComponent', () => {
  let component: DayTheoryComponent;
  let fixture: ComponentFixture<DayTheoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayTheoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayTheoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
