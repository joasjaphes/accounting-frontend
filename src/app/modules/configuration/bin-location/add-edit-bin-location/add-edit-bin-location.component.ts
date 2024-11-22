import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BinLocation } from '../../../../store/bin-location/bin-location.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { BinLocationService } from '../../../../services/bin-location.service';
import { CommonService } from '../../../../services/common.service';
import { BinLocationActions } from '../../../../store/bin-location/bin-location.action';
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { fadeIn } from '../../../../shared/animations';

@Component({
  selector: 'app-add-edit-bin-location',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInput, MatFormFieldModule, SaveButtonComponent],
  templateUrl: './add-edit-bin-location.component.html',
  styleUrl: './add-edit-bin-location.component.scss',
  animations:[fadeIn]
})
export class AddEditBinLocationComponent implements OnInit {
  @Input() binLocation: BinLocation;
  @Output() close = new EventEmitter();
  binLocationForm: FormGroup;
  saving = false;
  companyId: any;
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private binLocationService: BinLocationService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.binLocationForm = this.formBuilder.group({
      name: [this.binLocation?.name],
      description: [this.binLocation?.description],
    });
    const user = JSON.parse(localStorage.getItem('accounting-user'));
    this.companyId = user.companyId;
  }

  async saveBinLocation() {
    this.saving = true;
    try {
      const binLocation = this.binLocationForm.value;
      const id = this.binLocation?.id ?? this.commonService.makeId();
      const payload: BinLocation = {
        ...binLocation,
        companyId: this.companyId,
        id,
      };
      await this.binLocationService.saveBinLocation(payload);
      this.store.dispatch(
        BinLocationActions.upsertBinLocation({ binLocation: payload })
      );
      this.onClose();
    } catch (error) {
      console.error(error);
    }
    this.saving = false;
  }

  onClose() {
    this.close.emit();
  }
}
