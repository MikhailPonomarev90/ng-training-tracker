import { Injectable } from '@angular/core';
import { LogEntry } from './models/logEntry';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logAction<TAction, TPayload = unknown>(action: TAction, payload?: TPayload): void {
    const logEntry: LogEntry<TAction, TPayload> = {
      id: crypto.randomUUID(),
      action,
      timestamp: new Date(),
      payload,
    };

    console.log(`[Log] [${String(action)}]`, logEntry);
  }
}
