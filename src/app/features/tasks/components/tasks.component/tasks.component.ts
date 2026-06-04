import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStore } from '../../store/task-store';
import { TaskFilterComponent } from '../task-filter.component/task-filter.component';
import { TaskItemComponent } from '../task-item.component/task-item.component';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, TaskItemComponent, TaskFilterComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private taskStore = inject(TaskStore);
  filteredTasks = this.taskStore.filteredTasks;
  taskInput = viewChild<ElementRef>('taskInput');
  @ViewChild('container', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;

  taskName = signal('');
  currentFilter = this.taskStore.currentFilter;

  progress = computed(() => {
    const total = this.taskStore.tasks().length;
    if (!total) return 0;
    return Math.round((this.taskStore.completedTasks() / total) * 100);
  });

  tasksRemaining = computed(() => {
    const total = this.taskStore.tasks().length;
    if (!total) return 0;
    return total - this.taskStore.completedTasks();
  });

  addTask() {
    if (!this.taskName().trim()) return;

    this.taskStore.addTask(this.taskName());
    this.taskName.set('');
    this.taskInput()?.nativeElement.focus();
  }

  async showStats() {
    const { TaskStatsComponent } = await import('../task-stats.component/task-stats.component');
    this.vcr.clear();
    const componentRef = this.vcr.createComponent(TaskStatsComponent);
  }
}
