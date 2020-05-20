import { Component, ViewChild, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Observable, SchedulerLike } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private fireservice: FirebaseService, private http: HttpClient) { }

  ngOnInit() {
    // this.fireservice.getuser().subscribe(result => {
    //   // this.items = result;
    //   console.log(result[0].payload.doc.data());
    // });

    this.http.get('http://localhost:5000/api/Users').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
