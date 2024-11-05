import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StoreSetup } from './store-setup.model';

export const StoreSetupActions = createActionGroup({
  source: 'StoreSetup',
  events: {
    'Load Stores': emptyProps(),
    'Done Loading Stores': emptyProps(),
    'Upsert Store': props<{ store: StoreSetup }>(),
    'Upsert Stores': props<{ stores: StoreSetup[] }>(),
    'Delete Store': props<{ id: string }>(),
    'Delete Stores': props<{ ids: string[] }>(),
    'Clear Stores': emptyProps(),
  },
});
