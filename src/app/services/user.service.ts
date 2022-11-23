import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { catchError, Observable, of, tap, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'

const httpOptions = {
  observe: 'body',
  responseType: 'json'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(protected readonly http: HttpClient) {
    console.log('Service constructor aangeroepen')
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error)

    return throwError(() => error)
  }

  getUsers(options?: any): Observable<User[]> {
    const endpoint = environment.apiUrl + 'user'
    return this.http
      .get<User[]>(endpoint, { ...options, ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getUserById(id: string, options?: any): Observable<User> {
    const endpoint = environment.apiUrl + 'user/' + id
    return this.http
      .get<User>(endpoint, { ...options, ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  deleteUser(id: String, userData: User, options?: any) {
    const endpoint = environment.apiUrl + 'user/' + id
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .delete<any>(endpoint, { ...options, ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  addUser(user: User, options?: any) {
    const endpoint = environment.apiUrl + 'User/register'
    return this.http
      .post<User>(endpoint, { ...options, 
        UserName : user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        emailAddress: user.email,
        PhoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender, 
        ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateUser(updatedUser: User, options?: any) {
    const endpoint = environment.apiUrl + 'user/' + updatedUser.id
    return this.http
      .put<User>(endpoint, { ...options,
        UserName : updatedUser.userName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        password: updatedUser.password,
        emailAddress: updatedUser.email,
        PhoneNumber: updatedUser.phoneNumber,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender, 
        ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError))
  }
}
