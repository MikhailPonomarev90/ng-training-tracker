import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStore } from '../../store/task-store';
import { TaskFilterComponent } from '../task-filter.component/task-filter.component';
import { TaskItemComponent } from '../task-item.component/task-item.component';
import { TaskStatsComponent } from '../task-stats.component/task-stats.component';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, TaskItemComponent, TaskFilterComponent, TaskStatsComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  protected taskStore = inject(TaskStore);
  filteredTasks = this.taskStore.filteredTasks;
  currentFilter = this.taskStore.currentFilter;
  showStats = signal(false);
  hasTasks = this.taskStore.hasTasks;

  taskInput = viewChild<ElementRef>('taskInput');
  taskName = signal('');

  isTaskNameEmpty = computed(() => this.taskName().trim() === '');

  addTask() {
    if (!this.taskName().trim()) return;

    this.taskStore.addTask(this.taskName());
    this.taskName.set('');
    this.taskInput()?.nativeElement.focus();
  }
}
