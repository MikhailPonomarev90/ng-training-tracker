import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { DayTheoryData } from '../../../../core/domain/models/day/day-data';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';

@Component({
  selector: 'app-day-theory-component',
  imports: [MatFormFieldModule, MatTabsModule, MatInputModule, FormsModule, TranslatePipe],
  templateUrl: './day-theory-component.html',
  styleUrl: './day-theory-component.css',
})
export class DayTheoryComponent {
  theoryData = model.required<DayTheoryData>();

  onFieldChange(updatedFields: Partial<DayTheoryData>): void {
    this.theoryData.update((current) => ({
      ...current,
      ...updatedFields,
    }));
  }
}
