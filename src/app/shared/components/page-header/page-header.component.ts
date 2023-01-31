import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppMenu } from '../../../app-menus';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../animations/router-animation';

@Component({
  selector: 'accounting-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() icon;
  @Input() menus: AppMenu[] = [];
  @Input() hideClose = true;
  @Output() close = new EventEmitter();
  routeElements = ROUTE_ANIMATIONS_ELEMENTS;
  // constructor() {}

  ngOnInit(): void {
    console.log('top');
  }

  onClose() {
    this.close.emit();
  }
}
