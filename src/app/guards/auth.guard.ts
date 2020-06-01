import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/Auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private alertify: AlertifyService, private authservice: AuthService) {
  }

  canActivate(): boolean {
    if (this.authservice.loggedIn()){
    return true;
    }
    this.alertify.error('you shall not pass');
    this.router.navigate(['/landingpage']);
    return false;
  }

}
