import { Component, OnInit } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
    }, error => {
      console.log(error);
    });
  }

}
