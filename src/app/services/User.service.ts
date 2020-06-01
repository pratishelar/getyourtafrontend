import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const HttpOptions ={
//   headers: new HttpHeaders({
//     'Authorization' : 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'UsersCrud');
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'UsersCrud/' + id);
  }

  UpdateUser(id, user): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'UsersCrud/' + id, user);
  }
}
