import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/User.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/Auth.service';
import { catchError } from 'rxjs/operators';
import { EventService } from 'src/app/services/Event.service';

@Injectable()
export class EventResolver implements Resolve<any>{

    pageNumber = 1;
    PageSize = 5;

    constructor(private eventservice: EventService, private router: Router, private alertify: AlertifyService,
                private authservice: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<any>{
        return this.eventservice.getEvents(this.authservice.decodedToken.nameid, this.pageNumber, this.PageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem Retriving Data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}