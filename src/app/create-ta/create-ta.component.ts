import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { TaformComponent } from '../taform/taform.component';
import { EventService } from '../services/Event.service';
import { UserService } from '../services/User.service';
import { AlertifyService } from '../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/Auth.service';

// const colors: any;
// = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3'
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF'
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA'
//   }
// };

@Component({
  selector: 'app-create-ta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-ta.component.html',
  styleUrls: ['./create-ta.component.css']
})
export class CreateTAComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private modal: NgbModal,
    private userservice: UserService,
    private aliertify: AlertifyService,
    private eventservice: EventService,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) {}
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event);
        this.editEvent(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('Deleted', event);
        this.deleteEvent(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: any[];
  // = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     end: addDays(new Date(), 1),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen = true;
  newevent = {};

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    console.log(this.events);
    const dialogRef = this.dialog.open(TaformComponent, {
      width: '1050px',
      data: {
        color: {
          primary: '',
          secondary: ''
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadEvents();
      this.refresh.next();
    });
  }

  editEvent(event): void {
    console.log(event);
    const dialogRef = this.dialog.open(TaformComponent, {
      width: '1050px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadEvents();
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if (confirm('Are you sure to delete')) {
      console.log('Implement delete functionality here');

      this.events = this.events.filter(event => event !== eventToDelete);

      this.eventservice
        .deleteEvent(this.authservice.decodedToken.nameid, eventToDelete.id)
        .subscribe(
          (event: any) => {
            this.aliertify.success('Deleted Successfully');
          },
          error => {
            this.aliertify.error(error);
          }
        );
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.loadEvents();
  }


  loadEvents() {
    this.route.data.subscribe(data => {
      this.events = data['event'].result;
      this.converteventobject();
      console.log(this.events);
    });

    // this.eventservice.getEvents(this.authservice.decodedToken.nameid).subscribe(
    //   (events: any) => {
    //     this.events = events;
    //     this.converteventobject();
    //     console.log(events);
    //   },
    //   error => {
    //     this.aliertify.error(error);
    //   }
    // );
  }

  loadEvent() {
    this.eventservice
      .getEvent(this.authservice.decodedToken.nameid, 1)
      .subscribe(
        (event: any) => {
          console.log(event);
        },
        error => {
          this.aliertify.error(error);
        }
      );
  }

  converteventobject() {
    this.events.forEach(element => {
      element.start = startOfDay(new Date(element.start));
      element.end = endOfDay(new Date(element.end));
      element.color = {
        primary: element.color,
        secondary: element.color
      };
      element.actions = this.actions;
      element.resizable = {
        beforeStart: true,
        afterEnd: true
      };
      element.draggable = true;
    });

    console.log(this.events);
  }
}
