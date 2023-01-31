import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'accounting-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  styleUrls: ['./dialog-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogLayoutComponent implements OnInit {
  @Input() title = '';
  @Input() icon;
  @Input() hideClose = true;
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

}
