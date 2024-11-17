import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BinLocation } from './bin-location.model';

export const BinLocationActions = createActionGroup({
  source: 'BinLocation',
  events: {
    'Load Bin Locations': emptyProps(),
    'Done Loading Bin Locations': emptyProps(),
    'Upsert Bin Location': props<{ binLocation: BinLocation }>(),
    'Upsert Bin Locations': props<{
      binLocations: BinLocation[];
    }>(),
    'Delete Bin Location': props<{ id: string }>(),
    'Delete Bin Locations': props<{ ids: string[] }>(),
    'Clear Bin Locations': emptyProps(),
  },
});
