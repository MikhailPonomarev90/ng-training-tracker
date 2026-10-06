import { Injectable, inject } from '@angular/core';
import { EntityType } from '../domain/models/entity-type.model';
import { LoggerService } from '../domain/services/logger-service';
import { StorageAction } from './models/storageAction';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  private logger = inject(LoggerService);

  saveAll<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.logger.logAction(EntityType.Storage, StorageAction.Save, {
        key,
        dataSize: Array.isArray(data) ? data.length : 1,
      });
    } catch (error) {
      this.logger.logAction(EntityType.Storage, StorageAction.SaveError, { key, error });
      throw error;
    }
  }

  load<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (!data) {
      this.logger.logAction(EntityType.Storage, StorageAction.LoadEmpty, { key });
      return null;
    }

    try {
      const parsedData = JSON.parse(data) as T;

      this.logger.logAction(EntityType.Storage, StorageAction.LoadSuccess, {
        key,
        dataSize: Array.isArray(parsedData) ? parsedData.length : 1,
      });
      return parsedData;
    } catch (error) {
      this.logger.logAction(EntityType.Storage, StorageAction.LoadParseError, { key, error });
      return null;
    }
  }
}
