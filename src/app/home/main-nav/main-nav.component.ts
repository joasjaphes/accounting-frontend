import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../../store/models/user.model';
import { AppMenu } from '../../app-menus';
import { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS } from '../../shared/animations/router-animation';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import * as userSelector from '../../store/selectors/user.selectors';

@Component({
  selector: 'accounting-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations:[routeAnimations],
  encapsulation: ViewEncapsulation.None
})
export class MainNavComponent implements OnInit {

  routeAnimations = ROUTE_ANIMATIONS_ELEMENTS;
  profilePictureUrl$:Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Input() currentUser: User;
  @Input() menus: AppMenu[];
  @Output() logout: EventEmitter<unknown> = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private dialog:MatDialog,
    private store:Store<AppState>
    ) { }

    ngOnInit(): void {
        this.profilePictureUrl$ = this.store.pipe(select(userSelector.selectProfilePicture))
    }

  onLogout() {
    this.logout.emit();
  }

  openProfile() {
    this.dialog.open(UserProfileComponent, {
      width:"60%",
      height:"60%",
      data:{user:this.currentUser}
    })
  }

}
