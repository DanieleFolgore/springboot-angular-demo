import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Use proxy during development; dev server forwards `/users` to Spring Boot on 8081
  private api = '/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
