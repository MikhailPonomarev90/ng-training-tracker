import { Component, computed, model, output, signal } from '@angular/core';
import { TaskFilter } from '../../models/task-filter.model';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  filter = model<TaskFilter>();
  filterOptions = Object.values(TaskFilter);
}
