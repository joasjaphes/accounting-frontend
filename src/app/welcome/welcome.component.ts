import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { go } from '../store/actions/router.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private store: Store<AppState>) {}
}
