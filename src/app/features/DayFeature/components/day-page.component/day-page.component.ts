import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DayData } from '../../../../core/domain/models/day/day-data';
import { DayQuestion } from '../../../../core/domain/models/day/question.model';
import { JSONValidationService } from '../../../../core/domain/services/jsonValidation/jsonvalidation-service';
import { L10nService } from '../../../../core/l10n/l10n-service';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';
import { DayStore } from '../../../../core/state/stores/day-store';
import { DayBriefingComponent } from '../day-briefing-component/day-briefing-component';
import { DayHeaderComponent } from '../day-header-component/day-header-component';
import { DayPracticeComponent } from '../day-practice-component/day-practice-component';
import { DayQuestionsComponent } from '../day-questions-component/day-questions-component';
import { DayTheoryComponent } from '../day-theory-component/day-theory-component';

@Component({
  selector: 'app-day-page',
  imports: [
    FormsModule,
    DayHeaderComponent,
    DayBriefingComponent,
    DayTheoryComponent,
    DayQuestionsComponent,
    DayPracticeComponent,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    TextFieldModule,
    TranslatePipe,
  ],
  templateUrl: './day-page.component.html',
  styleUrl: './day-page.component.css',
})
export class DayPageComponent {
  readonly dayStore = inject(DayStore);
  private l10n = inject(L10nService);
  private jsonValidationService = inject(JSONValidationService);

  dayData = this.dayStore.dayData;
  jsonInput = signal<string>('');
  errorMessage = signal<string>('');

  onFieldChange(patch: Partial<DayData>): void {
    this.dayStore.updateDayFields(patch);
  }

  onTheoryChange(field: string, value: string): void {
    const currentTheory = this.dayData()?.theory ?? { theoryData: '', timeSpent: '' };
    this.dayStore.updateDayFields({
      theory: { ...currentTheory, [field]: value },
    });
  }

  onPracticeChange(field: string, value: string): void {
    const currentPractice = this.dayData()?.practice ?? { tasks: [] };
    this.dayStore.updateDayFields({
      practice: { ...currentPractice, [field]: value },
    });
  }

  onQuestionAnswerChange(questionId: string, updatedFields: Partial<DayQuestion>): void {
    const currentDay = this.dayData();
    if (!currentDay) return;

    const updatedQuestions = currentDay.questions.questions.map((q) =>
      q.id === questionId ? ({ ...q, ...updatedFields } as DayQuestion) : q,
    );

    this.dayStore.updateDayFields({
      questions: {
        ...currentDay.questions,
        questions: updatedQuestions,
      },
    });
  }

  onTaskAdded(event: { taskTitle: string }) {
    this.dayStore.addTask(event.taskTitle);
  }

  loadDayFromJson(): void {
    const rawJson = this.jsonInput().trim();

    if (!rawJson) return;

    let parsedJson: unknown;

    try {
      parsedJson = JSON.parse(rawJson);
    } catch {
      this.errorMessage.set(this.l10n.translate((t) => t.errors.invalidJSON));
      return;
    }

    const result = this.jsonValidationService.validateDayData(parsedJson);

    if (!result.success) {
      this.errorMessage.set(result.error);
      return;
    }

    this.dayStore.addDay(result.data);

    this.errorMessage.set('');
    this.jsonInput.set('');
  }

  generateReport(): void {
    const data = this.dayData();
    if (!data) return;

    const reportJsonString = JSON.stringify(data, null, 2);
    console.log(reportJsonString);

    navigator.clipboard
      .writeText(reportJsonString)
      .catch((err) => console.error('Clipboard error: ', err));
  }

  copyErrorToClipboard(): void {
    navigator.clipboard
      .writeText(this.errorMessage())
      .catch((err) => console.error('Clipboard error: ', err));
  }
}
