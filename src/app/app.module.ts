import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInterceptor } from './interceptors/http.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/reducers/router.reducer';
import { AppRoutingModule } from './app-routing.module';
import { MainNavComponent } from './home/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationComponent } from './welcome/registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeMessageComponent } from './welcome/welcome-message/welcome-message.component';
import { ClientDetailsComponent } from './welcome/registration/client-details/client-details.component';
import { BusinessDetailsComponent } from './welcome/registration/business-details/business-details.component';
import { AuthenticationDetailsComponent } from './welcome/registration/authentication-details/authentication-details.component';
import { SavingDetailsComponent } from './welcome/registration/saving-details/saving-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainNavComponent,
    DashboardComponent,
    UserProfileComponent,
    RegistrationComponent,
    WelcomeComponent,
    WelcomeMessageComponent,
    ClientDetailsComponent,
    BusinessDetailsComponent,
    AuthenticationDetailsComponent,
    SavingDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    EffectsModule.forRoot(effects),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    CustomSerializer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
