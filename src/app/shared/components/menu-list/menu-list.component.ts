import { Component, Input, OnInit } from '@angular/core';
import { AppMenu } from '../../../app-menus';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../animations/router-animation';

@Component({
  selector: 'accounting-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() menus:AppMenu[] = [];

  // constructor() { }

}
