import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from './product.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': emptyProps(),
    'Done Loading Products': emptyProps(),
    'Upsert Product': props<{ product: Product }>(),
    'Upsert Products': props<{ products: Product[] }>(),
    'Delete Product': props<{ id: string }>(),
    'Delete Products': props<{ ids: string[] }>(),
    'Clear Products': emptyProps(),
  },
});
