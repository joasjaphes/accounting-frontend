import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PriceCategory } from '../../../../store/price-category/price-category.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { PriceCategoryService } from '../../../../services/price-category.service';
import { CommonService } from '../../../../services/common.service';
import { PriceCategoryActions } from '../../../../store/price-category/price-category.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-edit-price-categories',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatCheckboxModule,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-price-categories.component.html',
  styleUrl: './add-edit-price-categories.component.scss',
})
export class AddEditPriceCategoriesComponent implements OnInit {
  @Input() priceCategory: PriceCategory;
  @Output() close = new EventEmitter();
  priceCategoryForm: FormGroup;
  companyId: any;
  saving = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private priceCategoryService: PriceCategoryService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.priceCategoryForm = this.formBuilder.group({
      name: [this.priceCategory?.name],
      description: [this.priceCategory?.description],
      isDefault: [this.priceCategory?.isDefault || false],
      profitMargin: [this.priceCategory?.profitMargin],
      status: [this.priceCategory?.status || 'Active'],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
  }

  async onSave() {
    this.saving = true;
    try {
      const priceCategory = this.priceCategoryForm.value;
      const id = this.priceCategory?.id || this.commonService.makeId();
      const payload = { ...priceCategory, id, companyId: this.companyId };
      await this.priceCategoryService.savePriceCategory(payload);
      this.store.dispatch(
        PriceCategoryActions.upsertPriceCategory({ priceCategory: payload })
      );
      this.onClose();
    } catch (e) {
      console.error('Failed to save', e);
    }
    this.saving = false;
  }

  onClose() {
    this.close.emit();
  }
}
