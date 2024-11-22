import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Packaging } from '../../../../store/packaging/packaging.model';
import { PackagingService } from '../../../../services/packaging.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { CommonService } from '../../../../services/common.service';
import { PackagingActions } from '../../../../store/packaging/packaging.action';
import { MatInput } from '@angular/material/input';
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { fadeIn } from '../../../../shared/animations';

@Component({
  selector: 'app-add-edit-packaging',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-packaging.component.html',
  styleUrl: './add-edit-packaging.component.scss',
  animations: [fadeIn],
})
export class AddEditPackagingComponent implements OnInit {
  @Input() packaging: Packaging;
  @Output() close = new EventEmitter();
  packagingForm: FormGroup;
  saving = false;
  constructor(
    private formBuilder: FormBuilder,
    private packagingService: PackagingService,
    private store: Store<AppState>,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.packagingForm = this.formBuilder.group({
      name: [this.packaging?.name],
      description: [this.packaging?.description],
      pieces: [this.packaging?.pieces],
    });
  }

  async savePackaging() {
    this.saving = true;
    try {
      const packaging = this.packagingForm.value;
      const id = this.packaging?.id ?? this.commonService.makeId();
      const payload: Packaging = {
        ...packaging,
        id,
      };
      await this.packagingService.savePackaging(payload);
      this.store.dispatch(
        PackagingActions.upsertPackaging({ packaging: payload })
      );
      this.onClose();
    } catch (e) {
      console.error('Failed to save packaging', e);
    }
    this.saving = false;
  }

  onClose() {
    this.close.emit();
  }
}
