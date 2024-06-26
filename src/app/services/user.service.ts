import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getLoggedUserData(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/api/v1/users/me`);
  }
}
