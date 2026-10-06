import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ActionType } from '../../domain/models/action-type.model';
import { DayData } from '../../domain/models/day-data';
import { EntityType } from '../../domain/models/entity-type.model';
import { Task } from '../../domain/models/task.model';
import { LoggerService } from '../../domain/services/logger-service';
import { StorageKey } from '../../infrastructure/models/storageKey';
import { PersistanceService } from '../../infrastructure/persistance-service';
import { DayStatisticsService } from '../services/day-statistics-service';

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

  // Теперь задачи берутся из секции practice.tasks
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

  readonly totalTasks = computed(() => this.dayStatisticsService.total(this.tasksSignal()));
  readonly completedTasks = computed(() => this.dayStatisticsService.completed(this.tasksSignal()));
  readonly progress = computed(() => this.dayStatisticsService.progress(this.tasksSignal()));
  readonly hasTasks = computed(() => this.dayStatisticsService.hasTasks(this.tasksSignal()));

  selectDay(id: string) {
    this.selectedDayId.set(id);
  }

  // Обновление произвольных полей дня (текст, теория, оценка и т.д.)
  updateDayFields(fields: Partial<DayData>) {
    const currentId = this.selectedDayId();
    if (!currentId) return;

    this.daysMapSignal.update((map) => {
      const currentDay = map[currentId];
      if (!currentDay) return map;

      const updatedDay = { ...currentDay, ...fields };
      updatedDay.done = this.checkIfDayIsDone(updatedDay);

      return { ...map, [currentId]: updatedDay };
    });
  }

  addTask(title: string) {
    const currentId = this.selectedDayId();
    if (!currentId) return;

    const newTask: Task = { id: Date.now(), title, completed: false };

    this.daysMapSignal.update((map) => {
      const currentDay = map[currentId] ?? this.createNewDayPlaceholder(currentId);
      const updatedDay = {
        ...currentDay,
        practice: {
          ...currentDay.practice,
          tasks: [...currentDay.practice.tasks, newTask],
        },
      };
      updatedDay.done = this.checkIfDayIsDone(updatedDay);

      return { ...map, [currentId]: updatedDay };
    });

    this.taskLoggerService.logAction(EntityType.Task, ActionType.Create, newTask.id);
  }

  toggleTask(taskId: number) {
    const currentId = this.selectedDayId();
    if (!currentId) return;

    this.daysMapSignal.update((map) => {
      const currentDay = map[currentId];
      if (!currentDay) return map;

      const updatedDay = {
        ...currentDay,
        practice: {
          ...currentDay.practice,
          tasks: currentDay.practice.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t,
          ),
        },
      };
      updatedDay.done = this.checkIfDayIsDone(updatedDay);

      return { ...map, [currentId]: updatedDay };
    });

    this.taskLoggerService.logAction(EntityType.Task, ActionType.Update, taskId);
  }

  removeTask(taskId: number) {
    const currentId = this.selectedDayId();
    if (!currentId) return;

    this.daysMapSignal.update((map) => {
      const currentDay = map[currentId];
      if (!currentDay) return map;

      const updatedDay = {
        ...currentDay,
        practice: {
          ...currentDay.practice,
          tasks: currentDay.practice.tasks.filter((t) => t.id !== taskId),
        },
      };
      updatedDay.done = this.checkIfDayIsDone(updatedDay);

      return { ...map, [currentId]: updatedDay };
    });
  }

  // Внутренняя проверка: все ли обязательные поля заполнены и все ли задачи выполнены
  private checkIfDayIsDone(day: DayData): boolean {
    // 1. Проверяем задачи: если задачи есть, они ВСЕ должны быть выполнены
    const tasks = day.practice?.tasks ?? [];
    const allTasksCompleted = tasks.length > 0 ? tasks.every((t) => t.completed) : true;

    // 2. Считаем обязательными ключевые текстовые блоки отчета и оценку
    const hasNotes = !!day.notes?.trim();
    const hasWhatLearned = !!day.theory?.whatLearned?.trim();
    const hasWhatImplemented = !!day.practice?.timeSpent?.trim();
    const hasRating = day.rating !== undefined && day.rating !== null && day.rating > 0;

    // 3. Все вопросы должны содержать ответ (зависит от типа вопроса)
    const allQuestionsAnswered = (day.questions ?? []).every((q) => {
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

  private createNewDayPlaceholder(id: string): DayData {
    return {
      id,
      date: { date: new Date(), dayNum: new Date().getDate() },
      active: true,
      done: false,
      theory: {
        theoryData: '',
        timeSpent: '',
        whatLearned: '',
        whatIsUnclear: '',
        newTerms: '',
      },
      practice: {
        timeSpent: '',
        tasks: [],
      },
      questions: [],
      notes: '',
      briefing: '',
      architecturalQuestion: '',
      architecturalAnswer: '',
      rating: 0,
    };
  }

  // Внутри класса DayStore:

  createDayWithData(customData: Partial<DayData>) {
    // Генерируем базовый безопасный ID, если его нет в JSON
    const id = customData.id || `day-${Date.now().toString(36)}`;

    // Создаем чистый плейсхолдер со всеми обязательными полями
    const placeholder = this.createNewDayPlaceholder(id);

    // Глубокое объединение (deep merge) данных, чтобы не потерять вложенные theory/practice
    const fullDayData: DayData = {
      ...placeholder,
      ...customData,
      id, // гарантируем строковый ID
      theory: {
        ...placeholder.theory,
        ...customData.theory,
      },
      practice: {
        ...placeholder.practice,
        ...customData.practice,
        tasks: customData.practice?.tasks || [],
      },
      questions: customData.questions || [],
    };

    // Проверяем, заполнено ли всё сразу
    fullDayData.done = this.checkIfDayIsDone(fullDayData);

    // Сохраняем в стор и делаем день активным (выбранным)
    this.daysMapSignal.update((map) => ({ ...map, [id]: fullDayData }));
    this.selectedDayId.set(id);
  }
}
