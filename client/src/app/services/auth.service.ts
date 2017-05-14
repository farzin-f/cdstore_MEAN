import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  lock = new Auth0Lock('rSg7_eRG1FyQOEqU3lX4f98Yjm1MyIIW', 'farzinfaridfar.auth0.com', {});

  constructor() {
      // Add callback for lock `authenticated` event
      this.lock.on("authenticated", (authResult) => {
        this.lock.getProfile(authResult.idToken, function (err, profile) {
          if(err)
            throw new Error("Profile authentification problem");

          localStorage.setItem('id_token', authResult.idToken);
          // in localStorage we can only store strings and not a json
          localStorage.setItem('profile', JSON.stringify(profile));
        });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
