import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'accounting-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() message = 'Loading...'
  constructor() { }

  ngOnInit(): void {
  }

}
