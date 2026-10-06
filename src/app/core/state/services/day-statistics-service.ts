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
}
