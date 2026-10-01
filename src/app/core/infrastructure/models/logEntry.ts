export interface LogEntry<TAction, TPayload = unknown> {
  id: string;
  action: TAction;
  timestamp: Date;
  payload?: TPayload;
}
