import { Component, computed, inject, signal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.getTasks();

  progress = computed(() => {
    const total = this.tasks().length;
    if (!total) return 0;
    return Math.round((this.taskService.completedCount() / total) * 100);
  });

  addTask(input: HTMLInputElement) {
    if (!input.value.trim()) return;

    this.taskService.addTask(input.value);
    input.value = '';
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }
}
