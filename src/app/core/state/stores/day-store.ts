import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { DayData } from '../../domain/models/day/day-data';
import { TaskActions } from '../../domain/models/day/task/task-actions';
import { TaskStatistics } from '../../domain/models/day/task/task-statistics';
import { Task } from '../../domain/models/day/task/task.model';
import { ActionType } from '../../domain/models/logger/action-type.model';
import { EntityType } from '../../domain/models/logger/entity-type.model';
import { LoggerService } from '../../domain/services/logger/logger-service';
import { StorageKey } from '../../infrastructure/models/storageKey';
import { PersistanceService } from '../../infrastructure/persistance-service';
import { DayStatisticsService } from '../services/statistics/day-statistics-service';

type DaysMap = Record<string, DayData>;

@Injectable({
  providedIn: 'root',
})
export class DayStore {
  private platformId = inject(PLATFORM_ID);
  private persistence = inject(PersistanceService);
  private taskLoggerService = inject(LoggerService);
  private dayStatisticsService = inject(DayStatisticsService);

  private daysMapSignal = signal<DaysMap>({});
  public selectedDayId = signal<string | null>(null);

  public readonly dayData = computed(() => {
    const id = this.selectedDayId();
    return id ? (this.daysMapSignal()[id] ?? null) : null;
  });

  public readonly tasksSignal = computed(() => {
    return this.dayData()?.practice?.tasks ?? [];
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedDays = this.persistence.load<DaysMap>(StorageKey.Days);
      const savedSelectedId = this.persistence.load<string>(StorageKey.selectedDay);

      if (savedDays) this.daysMapSignal.set(savedDays);
      if (savedSelectedId) this.selectedDayId.set(savedSelectedId);
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.persistence.saveAll(StorageKey.Days, this.daysMapSignal());
      }
    });

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.persistence.saveAll(StorageKey.selectedDay, this.selectedDayId());
      }
    });
  }

  readonly taskStatistics = computed<TaskStatistics>(() => ({
    total: this.dayStatisticsService.total(this.tasksSignal()),
    completed: this.dayStatisticsService.completed(this.tasksSignal()),
    remaining: this.dayStatisticsService.remaining(this.tasksSignal()),
    progress: this.dayStatisticsService.progress(this.tasksSignal()),
  }));

  readonly taskActions: TaskActions = {
    add: (title: string) => this.addTask(title),
    toggle: (taskId: number) => this.toggleTask(taskId),
    remove: (taskId: number) => this.removeTask(taskId),
  };

  addDay(day: DayData): void {
    this.daysMapSignal.update((map) => (map[day.id] ? map : { ...map, [day.id]: day }));
    this.selectDay(day.id);
  }

  selectDay(id: string) {
    this.selectedDayId.set(id);
  }

  updateDayFields(fields: Partial<DayData>) {
    this.updateCurrentDay((current) => ({
      ...current,
      ...fields,
    }));
  }

  addTask(title: string) {
    const currentId = this.selectedDayId();
    if (!currentId) return;

    const newTask: Task = { id: Date.now(), title, completed: false, addedByUser: true };

    // Используем спец. метод для создания плейсхолдера, если дня нет
    this.daysMapSignal.update((map) => {
      const currentDay = map[currentId];
      const updatedDay = this.finalizeDayUpdate({
        ...currentDay,
        practice: {
          ...currentDay.practice,
          tasks: [...currentDay.practice.tasks, newTask],
        },
      });
      return { ...map, [currentId]: updatedDay };
    });

    this.taskLoggerService.logAction(EntityType.Task, ActionType.Create, newTask.id);
  }

  toggleTask(taskId: number) {
    this.updateCurrentDay((current) => ({
      ...current,
      practice: {
        ...current.practice,
        tasks: current.practice.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t,
        ),
      },
    }));

    this.taskLoggerService.logAction(EntityType.Task, ActionType.Update, taskId);
  }

  removeTask(taskId: number) {
    this.updateCurrentDay((current) => ({
      ...current,
      practice: {
        ...current.practice,
        tasks: current.practice.tasks.filter((t) => t.id !== taskId),
      },
    }));
  }

  private updateCurrentDay(updater: (currentDay: DayData) => DayData) {
    const currentId = this.selectedDayId();
    if (!currentId) return;

    this.daysMapSignal.update((map) => {
      const currentDay = map[currentId];
      if (!currentDay) return map;

      const modifiedDay = updater(currentDay);
      const updatedDay = this.finalizeDayUpdate(modifiedDay);

      return { ...map, [currentId]: updatedDay };
    });
  }

  private finalizeDayUpdate(day: DayData): DayData {
    return {
      ...day,
      metadata: {
        ...day.metadata,
        done: this.checkIfDayIsDone(day),
      },
    };
  }

  private checkIfDayIsDone(day: DayData): boolean {
    const tasks = day.practice?.tasks ?? [];
    const allTasksCompleted = tasks.length > 0 ? tasks.every((t) => t.completed) : true;

    const hasNotes = !!day.briefing.notes?.trim();
    const hasWhatLearned = !!day.theory?.whatLearned?.trim();
    const hasWhatImplemented = !!day.practice?.timeSpent?.trim();
    const hasRating =
      day.questions.rating !== undefined &&
      day.questions.rating !== null &&
      day.questions.rating > 0;

    const allQuestionsAnswered = (day.questions.questions ?? []).every((q) => {
      if (q.type === 'text') return !!q.answer?.trim();
      if (q.type === 'binary') return q.answer !== undefined;
      if (q.type === 'multiple-choice') return q.selectedOptionIndex !== undefined;
      return true;
    });

    return (
      allTasksCompleted &&
      hasNotes &&
      hasWhatLearned &&
      hasWhatImplemented &&
      hasRating &&
      allQuestionsAnswered
    );
  }
}
