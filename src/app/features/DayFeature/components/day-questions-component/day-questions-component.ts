import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DayQuestionsData } from '../../../../core/domain/models/day/day-data';
import { DayQuestion } from '../../../../core/domain/models/day/question.model';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';

@Component({
  selector: 'app-day-questions-component',
  imports: [
    MatFormFieldModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './day-questions-component.html',
  styleUrl: './day-questions-component.css',
})
export class DayQuestionsComponent {
  questionsData = model.required<DayQuestionsData>();
  questionAnswerChange = output<{
    questionId: string;
    updatedFields: Partial<DayQuestion>;
  }>();

  ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  onFieldChange(updatedFields: Partial<DayQuestionsData>): void {
    this.questionsData.update((current) => ({
      ...current,
      ...updatedFields,
    }));
  }
}
