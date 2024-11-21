import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCategory } from '../../../../store/product-categories/product-category.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { ProductCategoryService } from '../../../../services/product-category.service';
import { Account } from '../../../../store/accounts/account.model';
import { fadeIn } from '../../../../shared/animations';
import { TaxCode } from '../../../../store/tax-code/tax-code.model';
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { CommonService } from '../../../../services/common.service';
import { MatInput } from '@angular/material/input';
import { ProductCategoryActions } from '../../../../store/product-categories/product-category.action';

@Component({
  selector: 'app-add-edit-product-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInput,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-product-category.component.html',
  styleUrl: './add-edit-product-category.component.scss',
  animations: [fadeIn],
})
export class AddEditProductCategoryComponent implements OnInit {
  @Input() productCategory: ProductCategory;
  @Input() accounts: Account[] = [];
  @Input() taxes: TaxCode[] = [];
  @Output() close = new EventEmitter();
  productCategoryForm: FormGroup;
  saving = false;

  constructor(
    private store: Store<AppState>,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.productCategoryForm = this.formBuilder.group({
      name: this.productCategory?.name || '',
      description: this.productCategory?.description || '',
      salesTax: this.productCategory?.salesTax || '',
      purchasingTax: this.productCategory?.purchasingTax || '',
      COGSAccount: this.productCategory?.COGSAccount || '',
      inventoryAccount: this.productCategory?.inventoryAccount || '',
      salesAccount: this.productCategory?.salesAccount || '',
    });
  }

  async onSave() {
    this.saving = true;
    try {
      const payload: ProductCategory = {
        id: this.productCategory?.id || this.commonService.makeId(),
        ...this.productCategoryForm.value,
      };
      await this.productCategoryService.saveProductCategory(payload);
      this.store.dispatch(
        ProductCategoryActions.upsertProductCategory({
          productCategory: payload,
        })
      );
      this.onClose();
    } catch (e) {
      console.error('Failed to save product category', e);
    }
    this.saving = false;
  }

  onClose() {
    this.close.emit();
  }
}
