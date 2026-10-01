import { Injectable } from '@angular/core';
import { Task } from '../../domain/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DayStatisticsService {
  total(tasks: Task[]): number {
    return tasks.length;
  }

  completed(tasks: Task[]): number {
    return tasks.filter((task) => task.completed).length;
  }

  remaining(tasks: Task[]): number {
    return tasks.filter((task) => !task.completed).length;
  }

  progress(tasks: Task[]): number {
    if (!tasks.length) return 0;

    const completed = this.completed(tasks);

    return Math.round((completed / tasks.length) * 100);
  }

  hasTasks(tasks: Task[]): boolean {
    return !this.remaining(tasks);
  }
  // private _tasks = signal<Task[]>([]);
  // private _currentFilter = signal<TaskFilter>(TaskFilter.All);

  // readonly totalTasks = computed(() => this.tasksSignal().length);
  // readonly completedTasks = computed(() => this.tasksSignal().filter((t) => t.completed).length);

  // readonly progress = computed(() => {
  //   if (!this.totalTasks()) return 0;
  //   return Math.round((this.completedTasks() / this.totalTasks()) * 100);
  // });

  // readonly tasksRemaining = computed(() => {
  //   if (!this.totalTasks()) return 0;
  //   return this.totalTasks() - this.completedTasks();
  // });

  // public changeFilter(filter: TaskFilter): void {
  //   this._currentFilter.set(filter);
  // }
}
