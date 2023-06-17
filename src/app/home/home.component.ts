import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appMenus } from '../app-menus';
import { loadAccounts } from '../store/actions/account.actions';
import { go } from '../store/actions/router.actions';
import { loadTransactions } from '../store/actions/transaction.actions';
import {
  addCurrentUser,
  removeCurrentUser,
} from '../store/actions/user.actions';
import { User } from '../store/models/user.model';
import { AppState } from '../store/reducers';
import * as userSelector from '../store/selectors/user.selectors';

@Component({
  selector: 'accounting-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menus = appMenus;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accounting-token');
    const user = localStorage.getItem('accounting-user');
    if (!token) {
      this.store.dispatch(go({ route: { path: ['login'] } }));
    }
    if (user) {
      const userPayload: User = JSON.parse(user);
      console.log('user', userPayload);
      this.store.dispatch(addCurrentUser({ user: userPayload }));
      // this.store.dispatch(setProfilePicture({ url: userPayload.profilePhoto }));
      this.store.dispatch(loadTransactions());
      this.store.dispatch(loadAccounts());
    }
  }

  logout() {
    localStorage.removeItem('accounting-token');
    localStorage.removeItem('accounting-user');
    this.store.dispatch(removeCurrentUser());
    this.store.dispatch(go({ route: { path: ['/', 'login'] } }));
  }
}
