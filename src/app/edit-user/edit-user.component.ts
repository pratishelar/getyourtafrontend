import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../Models/User';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/User.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @ViewChild('editform', { static: true}) editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  // users: User[];

  constructor(
    private userservice: UserService,
    private aliertify: AlertifyService,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });
  }

  updateuser() {
   this.userservice.UpdateUser(this.authservice.decodedToken.nameid, this.user).subscribe(next => {
    this.aliertify.success('profile updated');
    this.editForm.reset(this.user);
   }, error => {
     this.aliertify.error(error);
   });
  }

  // loadUser(){
  //   this.userservice.getUser(this.authservice.decodedToken.nameid).subscribe((user: User) => {
  //     this.user = user;
  //     console.log(this.user);
  //   }, error => {
  //     this.aliertify.error(error);
  //   });
  // }

  // loadUsers(){
  //   this.userservice.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //     console.log(this.users);
  //   }, error => {
  //     this.aliertify.error(error);
  //   });
  // }
}
