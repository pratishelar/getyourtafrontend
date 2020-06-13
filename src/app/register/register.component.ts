import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MustMatch } from '../helper/must-match.validator';
import { User } from '../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  hidepassword = true;
  hideconfpassword = true;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createregisterForm();
  }

  createregisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        gender: ['male'],
        name: ['', Validators.required],
        email: ['', Validators.required],
        dateofbirth: [null, Validators.required],
        officename: ['', Validators.required],
        gradepay: ['', Validators.required],
        office: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmpassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmpassword')
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPAssword').value
      ? null
      : { missmatch: true };
  }

  register() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          console.log('Registration Successfull');
          this.alertify.success('Registered successfully');
          // this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/dashboard']);
          });
        }
      );
    }
  }

  onReset() {
    this.registerForm.reset();
  }
}
