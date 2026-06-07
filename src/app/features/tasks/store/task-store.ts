import { isPlatformBrowser } from '@angular/common';
import { computed, effect, Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TaskLoggerService } from '../../../task-logger-service';
import { TaskFilter } from '../models/task-filter.model';
import { Task } from '../models/task.model';
import { TaskActionType } from '../services/taskLoggerService/models/task-action-type.model';
import { TaskPersistenceService } from '../services/taskPersistence.service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private tasksSignal = signal<Task[]>([]);
  readonly tasks = this.tasksSignal.asReadonly();
  currentFilter = signal<TaskFilter>(TaskFilter.All);
  private platformId = inject(PLATFORM_ID);
  private persistence = inject(TaskPersistenceService);
  private taskLoggerService = Inject(TaskLoggerService);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTasks = this.persistence.load();
      if (savedTasks) {
        this.tasksSignal.set(savedTasks);
      }
    }

    effect(() => {
      this.tasksSignal();
      console.log('Задачи обновились:', this.tasksSignal());
      if (isPlatformBrowser(this.platformId)) this.persistence.save(this.tasksSignal());
    });
  }

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

  readonly totalTasks = computed(() => this.tasksSignal().length);
  readonly completedTasks = computed(() => this.tasksSignal().filter((t) => t.completed).length);

  readonly progress = computed(() => {
    if (!this.totalTasks()) return 0;
    return Math.round((this.completedTasks() / this.totalTasks()) * 100);
  });

  readonly hasTasks = computed(() => {
    return this.totalTasks() ? true : false;
  });

  readonly tasksRemaining = computed(() => {
    if (!this.totalTasks()) return 0;
    return this.totalTasks() - this.completedTasks();
  });

  addTask(title: string) {
    const newTask: Task = { id: Date.now(), title, completed: false };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
    this.taskLoggerService.logAction(TaskActionType.Create, newTask.id);
  }

  toggleTask(id: number) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    this.taskLoggerService.logAction(TaskActionType.Update, id);
  }

  removeTask(id: number) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
    this.taskLoggerService.logAction(TaskActionType.Delete, id);
  }
}
