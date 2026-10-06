import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { DayData } from '../../../../core/domain/models/day-data';
import { L10nService } from '../../../../core/l10n/l10n-service';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';
import { DayStore } from '../../../../core/state/stores/day-store';
import { TaskFilter } from '../../models/task-filter.model';
import { NewTaskComponent } from '../new-task-component/new-task-component';
import { TaskFilterComponent } from '../task-filter.component/task-filter.component';

@Component({
  selector: 'app-day-page',
  imports: [
    FormsModule,
    TaskFilterComponent,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
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
  private readonly l10n = inject(L10nService); // Внедряем сервис перевода

  // Короткий селектор для доступа к переводам в HTML-шаблоне
  readonly t = computed(() => this.l10n.t());

  dayData = this.dayStore.dayData;
  currentFilter = signal<TaskFilter>(TaskFilter.All);
  jsonInput = signal<string>('');

  private dialog: MatDialog = inject(MatDialog);
  ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  public filteredTasks = computed(() => {
    const tasks = this.dayStore.tasksSignal();
    const filter = this.currentFilter();

    switch (filter) {
      case TaskFilter.Active:
        return tasks.filter((t) => !t.completed);
      case TaskFilter.Completed:
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  });

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        this.dayStore.addTask(result);
      }
    });
  }

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

  onQuestionAnswerChange(questionId: string, updatedFields: any): void {
    const currentQuestions = this.dayData()?.questions ?? [];
    const updatedQuestions = currentQuestions.map((q) =>
      q.id === questionId ? { ...q, ...updatedFields } : q,
    );
    this.dayStore.updateDayFields({ questions: updatedQuestions });
  }

  loadDayFromJson(): void {
    const rawJson = this.jsonInput().trim();
    if (!rawJson) return;

    try {
      const parsedData = JSON.parse(rawJson);
      this.dayStore.createDayWithData(parsedData);
      this.jsonInput.set('');
    } catch (error) {
      console.error('JSON parse error:', error);
    }
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
}
