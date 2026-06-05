import { TaskActionType } from './task-action-type.model';

export interface TaskLog {
  id: string; // Уникальный ID самого лога
  action: TaskActionType; // Тип действия (строго из нашего Enum)
  taskId: number; // ID задачи, с которой произошло действие
  timestamp: Date; // Время события
  payload?: any; // Дополнительные данные (например, старое/новое состояние)
}
