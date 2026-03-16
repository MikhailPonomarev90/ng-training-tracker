import { Component, computed, model, signal } from '@angular/core';
import { TaskFilter } from '../../../core/models/task-filter.model';
import { Task } from '../../../core/models/task.model';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  allTasks = model.required<Task[]>();
  filter = signal<TaskFilter>(TaskFilter.All);

  filterOptions = Object.values(TaskFilter);

  filteredTasks = computed(() => {
    const currentFilter = this.filter();

    switch (currentFilter) {
      case TaskFilter.Active:
        return this.allTasks().filter((t) => !t.completed);
      case TaskFilter.Completed:
        return this.allTasks().filter((t) => t.completed);
      default:
        return this.allTasks();
    }
  });
}
