import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../Models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEvents(userId: number, page?, itemPerPage?): Observable<any> {
    const paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any>();

    let params = new HttpParams();

    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('PageSize', itemPerPage);
    }
    return this.http
      .get<any>(this.baseUrl + 'users/' + userId + '/events', {
        observe: 'response',
        params
      })
      .pipe(
        map(Response => {
          paginatedResult.result = Response.body;
          if (Response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              Response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getEvent(userId: number, id: number): Observable<any> {
    return this.http.get<User>(
      this.baseUrl + 'users/' + userId + '/events/' + id
    );
  }

  AddEvent(userId: number, user: any) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/events', user);
  }

  UpdateEvent(userId: number, id: number, user: any) {
    return this.http.put(
      this.baseUrl + 'users/' + userId + '/events/' + id,
      user
    );
  }

  deleteEvent(userId: number, id: any) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/events/' + id);
  }
}
