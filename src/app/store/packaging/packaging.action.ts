import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Packaging } from './packaging.model';

export const PackagingActions = createActionGroup({
  source: 'Packaging',
  events: {
    'Load Packaging': emptyProps(),
    'Done Loading Packaging': emptyProps(),
    'Upsert Packaging': props<{ packaging: Packaging }>(),
    'Upsert Packagings': props<{
      packagings: Packaging[];
    }>(),
    'Delete Packaging': props<{ id: string }>(),
    'Delete Packagings': props<{ ids: string[] }>(),
    'Clear Packagings': emptyProps(),
  },
});
