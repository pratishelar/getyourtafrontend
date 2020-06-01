import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit(): void {}

  register() {
   this.authService.register(this.model).subscribe(() => {
     console.log('Registration Successfull');
     this.alertify.success('Registered successfully');
     this.router.navigate(['/login']);
   }, error => {
    console.log(error);
    this.alertify.error(error);
   });
  }
}
