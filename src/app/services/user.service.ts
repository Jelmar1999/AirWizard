import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../pages/user/user';
// import { USERS } from '../pages/user/mock-users';
import { environment } from 'src/environments/environment';

import { v4 as uuidv4 } from 'uuid';
import { ConstantPool } from '@angular/compiler';

const httpOptions = {
  observe: "body",
  responseType: "json",
};

@Injectable({
  providedIn: 'root'
})

export class UserService{

  constructor(protected readonly http: HttpClient) {
    console.log('UserService constructor aangeroepen');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    return throwError(() => error);
  }

  // CRUD FUNCTIONS
  getUsers(options?: any): Observable<User[]> {
    const endpoint = environment.apiUrl + "users";
    return this.http
      .get<User[]>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getUserById(id: string, options?: any): Observable<User> {
    const endpoint = environment.apiUrl + "users/" + id;
    return this.http
      .get<User>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }
  
  getUserByName(firstname: string) {
    return this.getUsers().pipe(
      map((users: User[]) => users.find(user => user.firstname === firstname)!)
    );
  }
  deleteUserById(id: string, options?: any){
    const endpoint = environment.apiUrl + "users/" + id;
    return this.http
      .delete<User>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  addUser(user: User, options?:any){
    const endpoint = environment.apiUrl + "users";
    console.log(endpoint)
    console.log(user)
    return this.http
      .post<User>(endpoint, { ...options, user, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getNewId(){
    return uuidv4()
  }
  
  updateUser(updatedUser: User, options?: any){
    const endpoint = environment.apiUrl + "users/" + updatedUser._id;
    return this.http
      .put<User>(endpoint, { ...options, updatedUser, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }
}
