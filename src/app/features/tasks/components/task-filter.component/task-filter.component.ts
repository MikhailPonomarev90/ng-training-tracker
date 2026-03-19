import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TaskFilter } from '../../models/task-filter.model';

@Component({
  selector: 'app-task-filter',
  imports: [TitleCasePipe],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  filter = input<TaskFilter>();
  filterChange = output<TaskFilter>();
  filterOptions = Object.values(TaskFilter);

  onFilterChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      this.filterChange.emit(event.target.value as TaskFilter);
    }
  }
}
