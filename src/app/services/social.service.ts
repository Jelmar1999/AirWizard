import { Injectable } from '@angular/core'
import { catchError, Observable, of, tap, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { User } from '../models/user.model'

const httpOptions = {
  observe: 'body',
  responseType: 'json'
}

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  constructor(protected readonly http: HttpClient) {
    console.log('Service constructor aangeroepen')
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error)

    return throwError(() => error)
  }

  getFollowedUsers(userData: User, options?: any): Observable<User[]> {
    const endpoint = `${environment.apiUrl}user/following/all`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http.get<User[]>(endpoint, { ...options, ...httpOptions }).pipe(tap(console.log), catchError(this.handleError))
  }

  getNotFollowedUsers(userData: User, options?: any): Observable<User[]> {
    const endpoint = `${environment.apiUrl}user/following/not`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http.get<User[]>(endpoint, { ...options, ...httpOptions }).pipe(tap(console.log), catchError(this.handleError))
  }

  followUser(userData: User, userToFollow: User, options?: any): Observable<any> {
    const endpoint = `${environment.apiUrl}user/${userToFollow.id}/follow`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http.post<any>(endpoint, {}, { ...options, ...httpOptions }).pipe(
      tap(console.log),
      catchError((error: any) => {
        console.log('error:', error)
        console.log('error.message:', error.message)
        console.log('error.error.message:', error.error.message)
        return of(undefined)
      })
    )
  }

  unfollowUser(userData: User, userToUnfollow: User, options?: any): Observable<any> {
    const endpoint = `${environment.apiUrl}user/${userToUnfollow.id}/unfollow`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http.delete<any>(endpoint, { ...options, ...httpOptions }).pipe(
      tap(console.log),
      catchError((error: any) => {
        console.log('error:', error)
        console.log('error.message:', error.message)
        console.log('error.error.message:', error.error.message)
        return of(undefined)
      })
    )
  }
}
