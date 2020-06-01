import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/User.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/Auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserEditResolver implements Resolve<User>{

    constructor(private userservice: UserService, private router: Router, private alertify: AlertifyService,
                private authservice: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userservice.getUser(this.authservice.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem Retriving Data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }

}