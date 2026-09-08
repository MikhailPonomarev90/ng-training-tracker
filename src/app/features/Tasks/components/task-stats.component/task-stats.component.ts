import { Component, inject } from '@angular/core';
import { TaskStore } from '../../store/task-store';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.scss',
  standalone: true,
})
export class TaskStatsComponent {
  protected taskStore = inject(TaskStore);
  totalTasks = this.taskStore.totalTasks;
  completedTasks = this.taskStore.completedTasks;
  activeTasks = this.taskStore.tasksRemaining;
  progress = this.taskStore.progress;
}
