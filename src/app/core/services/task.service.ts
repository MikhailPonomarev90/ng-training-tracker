import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([]);
  completedCount = computed(() => 0);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTasks = localStorage.getItem('my_tasks');
      if (savedTasks) {
        // Используем .set() для обновления значения сигнала
        this.tasks.set(JSON.parse(savedTasks));
      }
    }

    effect(() => {
      const currentTasks = this.tasks();
      console.log('Задачи обновились:', currentTasks);
      if (isPlatformBrowser(this.platformId))
        localStorage.setItem('my_tasks', JSON.stringify(currentTasks));
    });

    this.completedCount = computed(() => this.tasks().filter((t) => t.completed).length);
  }

  getTasks() {
    return this.tasks;
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }

  removeTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
