import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { EventService } from '../services/Event.service';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-taform',
  templateUrl: './taform.component.html',
  styleUrls: ['./taform.component.css']
})
export class TaformComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaformComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // tslint:disable-next-line: variable-name
    private _formBuilder: FormBuilder,
    private eventservice: EventService,
    private authservice: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    console.log(this.data);
  }

  AddEvent() {
    this.eventservice
      .AddEvent(this.authservice.decodedToken.nameid, this.data)
      .subscribe(
        () => {
          this.alertify.success('Added successfully');
          // this.router.navigate(['/login']);
          this.dialogRef.close(this.data);
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
  }

  EditEvent() {
    this.eventservice
      .AddEvent(this.authservice.decodedToken.nameid, this.data)
      .subscribe(
        () => {
          this.alertify.success('Added successfully');
          // this.router.navigate(['/login']);
          this.dialogRef.close(this.data);
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
  }
}
