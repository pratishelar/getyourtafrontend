import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/User.service';
import { AlertifyService } from '../services/alertify.service';
import { EventService } from '../services/Event.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;

  rows = [];
  columns = [{ prop: 'id' }, { name: 'title' }, { name: 'start' },
   { name: 'end' }, { name: 'source' }, { name: 'destination' },
   { name: 'stayType' }, { name: 'vehicle' }, { name: 'da' },
    { name: 'daRate' }, { name: 'daPercent' }, { name: 'fair' },
    { name: 'km' }, { name: 'totalTime' }, { name: 'total' }];

  constructor(
    private userservice: UserService,
    private aliertify: AlertifyService,
    private eventservice: EventService,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) {
    this.loadingIndicator = false;
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.route.data.subscribe(data => {
      this.rows = data['event'];
      console.log(this.rows);
    });
  }
}
