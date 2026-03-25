import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskFilterComponent } from '../tasks/components/task-filter.component/task-filter.component';
import { TasksComponent } from '../tasks/components/tasks.component/tasks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [TasksComponent],
})
export class DashboardComponent {}
