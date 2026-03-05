import { Component, computed, signal } from '@angular/core';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  tasks = signal<Task[]>([]);

  completedCount = computed(() => this.tasks().filter((t) => t.completed).length);

  progress = computed(() => {
    const total = this.tasks().length;
    if (!total) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  addTask(title: string) {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  completeTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: true } : task)),
    );
  }
}
