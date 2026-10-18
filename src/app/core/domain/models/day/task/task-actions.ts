export interface TaskActions {
  add: (title: string) => void;
  toggle: (taskId: number) => void;
  remove: (taskId: number) => void;
}
