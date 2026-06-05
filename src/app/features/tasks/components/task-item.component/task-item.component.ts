import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  standalone: true,
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggleTask = output<number>();
  removeTask = output<number>();

  protected toggle(id: number) {
    this.toggleTask.emit(id);
  }

  protected remove(id: number) {
    this.removeTask.emit(id);
  }
}
