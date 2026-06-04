import { computed, Injectable, signal } from '@angular/core';
import { TaskFilter } from '../models/task-filter.model';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private tasksSignal = signal<Task[]>([]);
  readonly tasks = this.tasksSignal.asReadonly();
  private readonly _currentFilter = signal<TaskFilter>(TaskFilter.All);
  readonly currentFilter = this._currentFilter.asReadonly();

  filteredTasks = computed(() => {
    switch (this.currentFilter()) {
      case TaskFilter.Active:
        return this.tasks().filter((t) => !t.completed);
      case TaskFilter.Completed:
        return this.tasks().filter((t) => t.completed);
      default:
        return this.tasks();
    }
  });

  setFilter(filter: TaskFilter) {
    this._currentFilter.set(filter);
  }

  readonly completedTasks = computed(() => this.tasksSignal().filter((t) => t.completed).length);

  progress = computed(() => {
    const total = this.tasksSignal().length;
    if (!total) return 0;
    return Math.round((this.completedTasks() / total) * 100);
  });

  tasksRemaining = computed(() => {
    const total = this.tasksSignal().length;
    if (!total) return 0;
    return total - this.completedTasks();
  });

  addTask(title: string) {
    const newTask: Task = { id: Date.now(), title, completed: false };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
  }

  toggleTask(id: number) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  removeTask(id: number) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
  }
}
