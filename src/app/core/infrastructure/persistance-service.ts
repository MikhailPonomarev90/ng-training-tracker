import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  saveAll<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  load<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    return data ? (JSON.parse(data) as T) : null;
  }
}
