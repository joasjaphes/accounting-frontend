import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SaveButtonComponent } from '../../../shared/components/save-button/save-button.component';
import { CommonService } from '../../../services/common.service';
import { Product } from '../../../store/products/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { ProductActions } from '../../../store/products/product.actions';
import { ProductService } from '../../../services/product.service';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../../../services/http-client.service';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
    selector: 'app-add-edit-product',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        MatSelectModule,
        SaveButtonComponent,
        FileUploadComponent,
        AsyncPipe,
    ],
    templateUrl: './add-edit-product.component.html',
    styleUrl: './add-edit-product.component.scss',
    standalone: true
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;
  productImageUrl: string;
  @Output() close = new EventEmitter();
  @Input() product: Product;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private store: Store<AppState>,
    private productService: ProductService,
    private http: HttpClientService
  ) {}
  ngOnInit() {}

  ngOnChanges() {
    console.log('Product', this.product);
    this.productForm = this.formBuilder.group({
      name: this.product?.name || '',
      description: this.product?.description || '',
      type: this.product?.type || 'Physical',
      price: this.product?.price || '',
    });
    if (this.product?.imageUrl) {
      this.productImageUrl = this.product.imageUrl;
    }
  }

  imageUploaded(url) {
    console.log('url', url);
    this.productImageUrl = url;
  }

  get imageUrl() {
    if (this.productImageUrl) {
      return this.http.getImageUrl(this.productImageUrl);
    } else {
      return of(null);
    }
  }

  async onSave() {
    try {
      const formData = this.productForm.value;
      const id = this.product?.id || this.commonService.makeId();
      const payload: Product = {
        id: id,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        price: formData.price,
        imageUrl: this.productImageUrl || '',
      };
      await this.productService.saveProduct(payload);
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
