import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewChild,
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
  taskStore = inject(TaskStore);
  taskInput = viewChild<ElementRef>('taskInput');
  taskName = signal('');
  @ViewChild('container', { read: ViewContainerRef, static: true })
  vcr!: ViewContainerRef;

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
