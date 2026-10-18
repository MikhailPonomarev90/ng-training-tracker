import { Injectable } from '@angular/core';
import { DayData } from '../../models/day/day-data';
import { DayDataSchema } from '../../models/json-validation/day-data.schema';

type DayDataValidationResult = { success: true; data: DayData } | { success: false; error: string };

@Injectable({
  providedIn: 'root',
})
export class JSONValidationService {
  validateDayData(value: unknown): DayDataValidationResult {
    const result = DayDataSchema.safeParse(value);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.error.issues
        .map((issue) => {
          const path = issue.path.join('.');
          return path ? `${path}: ${issue.message}` : issue.message;
        })
        .join('\n'),
    };
  }
}
