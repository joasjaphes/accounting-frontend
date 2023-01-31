import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'accounting-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  @Input() saveText = 'Save';
  @Input() cancelText = 'Cancel';
  @Input() showCancel = true;
  @Input() confirmFirst = true;
  @Input() confirmText = 'Are you sure?';
  @Input() savingData = false;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  confirming = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSave(confirming = false) {
    console.log('confirming', confirming);
    if (!confirming) {
      this.save.emit();
      this.confirming = false;
    } else {
      this.confirming = true;
    }
  }

  onCancel() {
    this.cancel.emit();
    this.confirming = false;
  }

}
