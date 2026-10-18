import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { SupportedLang, TranslationKeys } from './translation.model';

@Injectable({
  providedIn: 'root',
})
export class L10nService {
  private readonly http = inject(HttpClient);

  readonly currentLang = signal<SupportedLang>(
    (localStorage.getItem('pref_lang') as SupportedLang) || 'ru',
  );

  private translationData = signal<TranslationKeys | null>(null);

  readonly t = computed<TranslationKeys | null>(() => this.translationData());

  readonly isLoading = signal<boolean>(true);

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      this.isLoading.set(true);

      this.http.get<TranslationKeys>(`/assets/i18n/${lang}.json`).subscribe({
        next: (json) => {
          this.translationData.set(json); // Парсинг в сигнал происходит автоматически
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(`Не удалось загрузить перевод для языка: ${lang}`, err);
          this.isLoading.set(false);
        },
      });
    });
  }

  translate(selector: (keys: TranslationKeys) => string): string {
    const data = this.translationData();
    if (!data) return '';

    try {
      return selector(data);
    } catch {
      return '';
    }
  }

  setLanguage(lang: SupportedLang): void {
    this.currentLang.set(lang);
    localStorage.setItem('pref_lang', lang);
  }
}
