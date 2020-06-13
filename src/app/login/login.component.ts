import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  hidepassword = true;
  loginForm: FormGroup;
  user: User;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)]
      ]
    });
  }

  login() {


    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.user = Object.assign({}, this.loginForm.value);

      this.user = Object.assign({}, this.loginForm.value);
      this.authService.login(this.user).subscribe(
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
  }

   // convenience getter for easy access to form fields
   get f() {
    return this.loginForm.controls;
  }


  loggedIn() {
    return this.authService.loggedIn();
  }
}
