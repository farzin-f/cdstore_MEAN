import { Routes, RouterModule } from '@angular/router';

import  { HomeComponent } from "./components/home/home.component";
import  { AddComponent } from "./components/add/add.component";
import  { CareerComponent } from "./components/career/career.component";
import  { ProfileComponent } from "./components/profile/profile.component";
import  { AuthGuard } from "./auth-guard";

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'career',
    component: CareerComponent,
    canActivate: [AuthGuard]
  }
];

export const APP_ROUTES_PROVIDER = [
  RouterModule.forRoot(APP_ROUTES)
];
