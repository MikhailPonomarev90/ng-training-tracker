import { Task } from './task.model';

export interface DayData {
  date: {
    date: Date;
    dayNum: number;
  };
  tasks: Task[];
  active: boolean;
  done: boolean;
}
