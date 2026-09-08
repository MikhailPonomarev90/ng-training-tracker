import { Injectable } from '@angular/core';
import { TaskActionType } from './models/task-action-type.model';
import { TaskLog } from './models/task-log.model';

@Injectable({
  providedIn: 'root',
})
export class TaskLoggerService {
  logAction(action: TaskActionType, taskId: number, details?: any): void {
    const logEntry: TaskLog = {
      id: crypto.randomUUID(), // Генерация уникального ID для лога
      action: action, // Переданный тип из Enum
      taskId: taskId,
      timestamp: new Date(),
      payload: details,
    };

    // Отправка на бэкенд или вывод в консоль

    console.log(`[Task Log] [${logEntry.action}] Задача #${logEntry.taskId}`, logEntry);
  }
}
