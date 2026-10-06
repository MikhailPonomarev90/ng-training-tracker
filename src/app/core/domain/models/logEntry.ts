import { StorageAction } from '../../infrastructure/models/storageAction';
import { ActionType } from './action-type.model';
import { EntityType } from './entity-type.model';

export interface LogEntry<TPayload = unknown> {
  id: string;
  action: ActionType | StorageAction;
  entity: EntityType;
  timestamp: Date;
  payload?: TPayload;
}
