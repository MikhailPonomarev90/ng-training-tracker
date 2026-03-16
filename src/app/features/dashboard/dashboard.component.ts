import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../tasks/task-item.component/task-item.component';
import { TaskFilterComponent } from '../tasks/task-filter.component/task-filter.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [FormsModule, TaskItemComponent, TaskFilterComponent],
})
export class DashboardComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.getTasks();
  taskName = signal('');
  allCards = viewChildren(TaskItemComponent);
  taskInput = viewChild<ElementRef<HTMLInputElement>>('taskInput');

  progress = computed(() => {
    const total = this.tasks().length;
    if (!total) return 0;
    return Math.round((this.taskService.completedCount() / total) * 100);
  });

  addTask() {
    if (!this.taskName().trim()) return;

    this.taskService.addTask(this.taskName());
    this.taskName.set('');
    this.taskInput()?.nativeElement.focus();
  }
}
