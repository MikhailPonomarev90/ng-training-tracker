import { TitleCasePipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskFilter } from '../../models/task-filter.model';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule, TitleCasePipe, MatButtonToggleModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  filter = model<TaskFilter>();
  filterOptions = Object.values(TaskFilter);
}
