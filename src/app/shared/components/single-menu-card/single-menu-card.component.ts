import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'accounting-single-menu-card',
  templateUrl: './single-menu-card.component.html',
  styleUrls: ['./single-menu-card.component.scss']
})
export class SingleMenuCardComponent  {
  @Input() title= '';
  @Input() icon;
  @Input() amount;
  // constructor() { }

  // ngOnInit(): void {
  // }

}
