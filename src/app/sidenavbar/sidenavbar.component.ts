import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { UserService } from '../services/User.service';
import { AlertifyService } from '../services/alertify.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  // token = localStorage.getItem('token');

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;

  constructor(private router: Router, public authService: AuthService,
              private userservice: UserService, private aliertify: AlertifyService) { }

  ngOnInit(): void {
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/landingpage']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

 
}
