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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'UsersCrud/' + id);
  }

  UpdateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'UsersCrud/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number){
    return this.http.delete(this.baseUrl +  'users/' + userId + '/photos/' + id);
  }
}
