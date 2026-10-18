import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DayMetadata } from '../../../../core/domain/models/day/day-data';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';

@Component({
  selector: 'app-day-header-component',
  imports: [MatIconModule, MatCardModule, TranslatePipe],
  templateUrl: './day-header-component.html',
  styleUrl: './day-header-component.css',
})
export class DayHeaderComponent {
  metadata = input.required<DayMetadata>();
}
