import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { APP_ROUTES_PROVIDER } from "./app.routes";
import { CareerComponent } from './components/career/career.component';
import { ProfileComponent } from './components/profile/profile.component';

import {UPLOAD_DIRECTIVES} from '../../node_modules/ng2-file-uploader/ng2-file-uploader';

//import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./auth-guard";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddComponent,
    CareerComponent,
    ProfileComponent,
    UPLOAD_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTES_PROVIDER
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
