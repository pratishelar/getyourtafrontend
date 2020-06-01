import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}
  login() {
    this.authService.login(this.model).subscribe(
      next => {
        console.log('logged in successfully');
        this.alertify.success('logged in successfully');
        // this.loggedIn();
      },
      error => {
        console.log(error);
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
