import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { DayBriefingData } from '../../../../core/domain/models/day/day-data';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';

@Component({
  selector: 'app-day-briefing-component',
  imports: [MatFormFieldModule, MatTabsModule, MatInputModule, FormsModule, TranslatePipe],
  templateUrl: './day-briefing-component.html',
  styleUrl: './day-briefing-component.css',
})
export class DayBriefingComponent {
  briefingData = model.required<DayBriefingData>();

  onFieldChange(updatedFields: Partial<DayBriefingData>): void {
    // Обновляем модель прямо внутри компонента
    this.briefingData.update((current) => ({
      ...current,
      ...updatedFields,
    }));
  }
}
