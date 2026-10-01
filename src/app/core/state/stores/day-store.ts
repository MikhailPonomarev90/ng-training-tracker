import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DayData } from '../../domain/models/day-data';
import { TaskActionType } from '../../domain/models/task-action-type.model';
import { Task } from '../../domain/models/task.model';
import { LoggerService } from '../../infrastructure/logger-service';
import { StorageKey } from '../../infrastructure/models/storageKey';
import { PersistanceService } from '../../infrastructure/persistance-service';
import { DayStatisticsService } from '../services/day-statistics-service';

@Injectable({
  providedIn: 'root',
})
export class DayStore {
  private platformId = inject(PLATFORM_ID);
  private persistence = inject(PersistanceService);
  private taskLoggerService = Inject(LoggerService);
  private dayStatisticsService = Inject(DayStatisticsService);

  private daysSignal = signal<DayData[]>([]);
  private tasksSignal = signal<Task[]>([]);
  public dayData = signal<DayData | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedDays = this.persistence.load<DayData[]>(StorageKey.Days);
      const dayDataIndex = this.persistence.load<number>(StorageKey.selectedDay);
      if (savedDays) {
        this.daysSignal.set(savedDays);
        if (dayDataIndex) this.dayData.set(savedDays[dayDataIndex]);
      }
    }

    effect(() => {
      this.daysSignal();
      if (isPlatformBrowser(this.platformId))
        this.persistence.saveAll(StorageKey.Days, this.daysSignal());
    });
  }

  readonly totalTasks = computed(() =>
    this.dayStatisticsService.total(this.dayData()?.tasks ?? []),
  );

  readonly completedTasks = computed(() =>
    this.dayStatisticsService.completed(this.dayData()?.tasks ?? []),
  );

  readonly tasksRemaining = computed(() =>
    this.dayStatisticsService.remaining(this.dayData()?.tasks ?? []),
  );

  readonly progress = computed(() =>
    this.dayStatisticsService.progress(this.dayData()?.tasks ?? []),
  );

  readonly hasTasks = computed(() =>
    this.dayStatisticsService.hasTasks(this.dayData()?.tasks ?? []),
  );

  addTask(title: string) {
    const newTask: Task = { id: Date.now(), title, completed: false };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
    this.taskLoggerService.logAction(TaskActionType.Create, newTask.id);
  }

  toggleTask(id: number) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    this.taskLoggerService.logAction(TaskActionType.Update, id);
  }

  removeTask(id: number) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
    this.taskLoggerService.logAction(TaskActionType.Delete, id);
  }
}
