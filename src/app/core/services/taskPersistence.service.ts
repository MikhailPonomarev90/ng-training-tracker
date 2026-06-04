import { Injectable } from '@angular/core';
import { Task } from '../../features/tasks/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskPersistenceService {
  save(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  load(): Task[] {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }
}
