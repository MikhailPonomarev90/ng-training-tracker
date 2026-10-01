import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DayStore } from '../../../../core/state/stores/day-store';
import { TaskFilter } from '../../models/task-filter.model';
import { TaskFilterComponent } from '../task-filter.component/task-filter.component';
import { TaskItemComponent } from '../task-item.component/task-item.component';

@Component({
  selector: 'app-day-page.component',
  imports: [
    FormsModule,
    TaskItemComponent,
    TaskFilterComponent,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  templateUrl: './day-page.component.html',
  styleUrl: './day-page.component.css',
})
export class DayPageComponent {
  readonly dayStore = inject(DayStore);
  dayData = this.dayStore.dayData;
  currentFilter = signal<TaskFilter>(TaskFilter.All);
  showStats = signal(false);
  hasTasks = this.dayStore.hasTasks;

  taskInput = viewChild<ElementRef>('taskInput');
  taskName = signal('');

  isTaskNameEmpty = computed(() => this.taskName().trim() === '');

  constructor() {
    const day = {
      date: {
        date: new Date(),
        dayNum: 9,
      },
      tasks: [],
      active: true,
      done: true,
    };
    this.dayData.set(day);
  }

  addTask() {
    if (!this.taskName().trim()) return;

    this.dayStore.addTask(this.taskName());
    this.taskName.set('');
    this.taskInput()?.nativeElement.focus();
  }

  // public filteredTasks = computed(() => {
  //   const tasks = this.dayStore.dayData()?.tasks ?? [];
  //   const filter = this.currentFilter();

  //   switch (filter) {
  //     case TaskFilter.Active:
  //       return tasks.filter((t) => !t.completed);
  //     case TaskFilter.Completed:
  //       return tasks.filter((t) => t.completed);
  //     default:
  //       return tasks;
  //   }
  // });
}
