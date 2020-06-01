import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/Auth.service';
import { EditUserComponent } from '../edit-user/edit-user.component';



@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedFormGuard implements CanDeactivate <EditUserComponent>{

  constructor(private router: Router, private alertify: AlertifyService, private authservice: AuthService) {
  }

  canDeactivate(component: EditUserComponent) {
    if (component.editForm.dirty){
    return confirm ('Unsaved Changes will be lost, Are you sure you want to continue?');
    }
    return true;
  }

}