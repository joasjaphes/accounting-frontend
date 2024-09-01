import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SaveButtonComponent } from '../../shared/components/save-button/save-button.component';
import { CommonService } from '../../services/common.service';
import { Product } from '../../store/products/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { ProductActions } from '../../store/products/product.actions';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;
  @Output() close = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: '',
      description: '',
      type: 'Physical',
    });
  }

  async onSave() {
    try {
      const formData = this.productForm.value;
      const id = this.commonService.makeId();
      const payload: Product = {
        id: id,
        name: formData.name,
        description: formData.description,
        type: formData.type,
      };
      this.store.dispatch(ProductActions.upsertProduct({ product: payload }));
      this.onClose();
    } catch (e) {
      console.error('Failed to save product', e);
    }
  }

  onClose() {
    this.close.emit();
  }
}
