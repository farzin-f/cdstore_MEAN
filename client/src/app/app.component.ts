import { Component } from '@angular/core';
import { CdService } from "./services/cd.service";
import { AuthService } from "./services/auth.service";
// import { AuthGuardService } from './services/auth-guard.service';
// import { AUTH_PROVIDERS } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CdService]
})
export class AppComponent {
  title = 'App Works!';

  constructor(private authService: AuthService){  }
}
