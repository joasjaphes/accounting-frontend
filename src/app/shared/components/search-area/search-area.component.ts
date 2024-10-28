import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search-area',
  standalone: true,
  imports: [MatFormField, MatInput, FormsModule],
  templateUrl: './search-area.component.html',
  styleUrl: './search-area.component.scss',
})
export class SearchAreaComponent {
  @Input() searchValue = '';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Output() searchValueChange = new EventEmitter<string>();

  onInput(event) {
    this.searchValueChange.emit(event.target.value);
  }
}
