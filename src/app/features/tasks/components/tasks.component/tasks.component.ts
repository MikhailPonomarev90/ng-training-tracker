import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TaskItemComponent } from '../task-item.component/task-item.component';
import { Task } from '../../models/task.model';
import { TaskFilter } from '../../models/task-filter.model';
import { TaskService } from '../../../../core/services/task.service';
import { TaskFilterComponent } from '../task-filter.component/task-filter.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule, TaskItemComponent, TaskFilterComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private taskService = inject(TaskService);
  allTasks = this.taskService.getTasks();
  taskInput = viewChild<ElementRef>('taskInput');
  @ViewChild('container', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;

  taskName = signal('');
  currentFilter = signal<TaskFilter>(TaskFilter.All);

  filteredTasks = computed(() => {
    switch (this.currentFilter()) {
      case TaskFilter.Active:
        return this.allTasks().filter((t) => !t.completed);
      case TaskFilter.Completed:
        return this.allTasks().filter((t) => t.completed);
      default:
        return this.allTasks();
    }
  });

  progress = computed(() => {
    const total = this.allTasks().length;
    if (!total) return 0;
    return Math.round((this.taskService.completedCount() / total) * 100);
  });

  tasksRemaining = computed(() => {
    const total = this.allTasks().length;
    if (!total) return 0;
    return total - this.taskService.completedCount();
  });

  addTask() {
    if (!this.taskName().trim()) return;

    this.taskService.addTask(this.taskName());
    this.taskName.set('');
    this.taskInput()?.nativeElement.focus();
  }

  async showStats() {
    const { TaskStatsComponent } = await import('../task-stats.component/task-stats.component');
    this.vcr.clear();
    const componentRef = this.vcr.createComponent(TaskStatsComponent);
  }
}
