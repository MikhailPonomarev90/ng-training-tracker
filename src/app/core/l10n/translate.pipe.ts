import { Pipe, PipeTransform, inject } from '@angular/core';
import { L10nService } from './l10n-service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly l10n = inject(L10nService);

  transform(path: string): string {
    const translations = this.l10n.t();
    if (!translations) return '';

    return path.split('.').reduce((obj: any, key) => obj?.[key], translations) || path;
  }
}
