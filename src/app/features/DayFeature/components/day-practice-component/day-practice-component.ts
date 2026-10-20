import { Component, computed, inject, input, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DayPracticeData } from '../../../../core/domain/models/day/day-data';
import { TaskActions } from '../../../../core/domain/models/day/task/task-actions';
import { TaskStatistics } from '../../../../core/domain/models/day/task/task-statistics';
import { TranslatePipe } from '../../../../core/l10n/translate.pipe';
import { TaskFilter } from '../../models/task-filter.model';
import { NewTaskComponent } from '../new-task-component/new-task-component';
import { TaskFilterComponent } from '../task-filter.component/task-filter.component';

@Component({
  selector: 'app-day-practice-component',
  imports: [
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    TaskFilterComponent,
  ],
  templateUrl: './day-practice-component.html',
  styleUrl: './day-practice-component.css',
})
export class DayPracticeComponent {
  practiceData = model.required<DayPracticeData>();
  taskActions = input.required<TaskActions>();
  taskStatistics = input.required<TaskStatistics>();

  currentFilter = signal<TaskFilter>(TaskFilter.All);
  private dialog: MatDialog = inject(MatDialog);
  private tasksSignal = computed(() => this.practiceData().tasks || []);

  onFieldChange(updatedFields: Partial<DayPracticeData>): void {
    this.practiceData.update((current) => ({
      ...current,
      ...updatedFields,
    }));
  }

  public filteredTasks = computed(() => {
    const tasks = this.tasksSignal();
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
        this.taskActions().add(result);
      }
    });
  }
}
