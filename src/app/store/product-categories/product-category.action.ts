import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductCategory } from './product-category.model';

export const ProductCategoryActions = createActionGroup({
  source: 'ProductCategory',
  events: {
    'Load Product Categories': emptyProps(),
    'Done Loading Product Categories': emptyProps(),
    'Upsert Product Category': props<{ productCategory: ProductCategory }>(),
    'Upsert Product Categories': props<{
      productCategories: ProductCategory[];
    }>(),
    'Delete Product Category': props<{ id: string }>(),
    'Delete Product Categories': props<{ ids: string[] }>(),
    'Clear Product Categories': emptyProps(),
  },
});
