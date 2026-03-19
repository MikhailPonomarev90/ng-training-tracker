import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/components/tasks.component/tasks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [TasksComponent],
})
export class DashboardComponent {}
