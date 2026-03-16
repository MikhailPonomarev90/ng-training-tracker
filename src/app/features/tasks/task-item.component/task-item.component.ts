import { Component, inject, input } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  standalone: true,
})
export class TaskItemComponent {
  private taskService = inject(TaskService);
  task = input.required<Task>();

  logTask() {
    console.log('ID задачи:', this.task().id);
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }
}
