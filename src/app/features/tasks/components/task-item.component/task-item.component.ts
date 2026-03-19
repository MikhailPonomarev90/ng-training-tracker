import { Component, inject, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskStore } from '../../store/task-store';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  standalone: true,
})
export class TaskItemComponent {
  private taskStore = inject(TaskStore);
  task = input.required<Task>();

  logTask() {
    console.log('ID задачи:', this.task().id);
  }

  toggleTask(id: number) {
    this.taskStore.toggleTask(id);
  }

  removeTask(id: number) {
    this.taskStore.removeTask(id);
  }
}
