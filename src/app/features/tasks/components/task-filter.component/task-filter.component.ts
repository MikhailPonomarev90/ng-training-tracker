import { TitleCasePipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskFilter } from '../../../../core/models/task-filter.model';

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
