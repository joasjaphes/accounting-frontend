import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PriceCategory } from './price-category.model';

export const PriceCategoryActions = createActionGroup({
  source: 'PriceCategory',
  events: {
    'Load Price Categories': emptyProps(),
    'Done Loading Price Catgories': emptyProps(),
    'Upsert Price Category': props<{ priceCategory: PriceCategory }>(),
    'Upsert Price Categories': props<{
      priceCategories: PriceCategory[];
    }>(),
    'Delete Price Category': props<{ id: string }>(),
    'Delete Price Categories': props<{ ids: string[] }>(),
    'Clear Price Categories': emptyProps(),
  },
});
