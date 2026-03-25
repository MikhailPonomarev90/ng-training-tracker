import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  // Приватное состояние (сигнал)
  private tasksSignal = signal<Task[]>([]);

  // Публичные данные для компонентов (только для чтения)
  readonly tasks = this.tasksSignal.asReadonly();

  // Вычисляемые значения (автоматически обновляются)
  readonly completedCount = computed(() => this.tasksSignal().filter((t) => t.completed).length);

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
