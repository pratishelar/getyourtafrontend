import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
   this.authService.register(this.model).subscribe(() => {
     console.log('Registration Successfull');
   }, error => {
    console.log(error);
   });
  }
}
