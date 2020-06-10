import { Component, ViewChild, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Observable, SchedulerLike } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/Auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from './Models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private fireservice: FirebaseService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // this.fireservice.getuser().subscribe(result => {
    //   // this.items = result;
    //   console.log(result[0].payload.doc.data());
    // });

    // this.http.get('http://localhost:5000/api/Users').subscribe(response => {
    //   console.log(response);
    // }, error => {
    //   console.log(error);
    // });

    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.url);
    }

    if (this.loggedIn()){
      this.router.navigate(['/dashboard']);
    }

  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
