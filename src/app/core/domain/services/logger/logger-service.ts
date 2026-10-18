import { Injectable } from '@angular/core';
import { StorageAction } from '../../../infrastructure/models/storageAction';
import { ActionType } from '../../models/logger/action-type.model';
import { EntityType } from '../../models/logger/entity-type.model';
import { LogEntry } from '../../models/logger/logEntry';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logAction<TPayload = unknown>(
    entity: EntityType,
    action: ActionType | StorageAction,
    payload?: TPayload,
  ): void {
    const logEntry: LogEntry<TPayload> = {
      id: crypto.randomUUID(),
      action,
      entity,
      timestamp: new Date(),
      payload,
    };

    console.log(`[Log] [${String(action)} ${String(entity)}]`, logEntry);
  }
}
