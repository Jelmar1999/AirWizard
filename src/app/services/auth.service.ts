import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { User } from '../pages/user/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined)
  private readonly CURRENT_USER = 'currentuser'
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  constructor(private http: HttpClient, private router: Router) {
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User) => {
          if (user) {
            console.log('User found in local storage')
            this.currentUser$.next(user)
            // return this.validateToken(user);
            return of(user)
          } else {
            console.log(`No current user found`)
            return of(undefined)
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'))
  }
  login(email: string, password: string): Observable<User | undefined> {
    console.log(`login at ${environment.apiUrl}login`)

    return this.http.post<User>(`${environment.apiUrl}login`, { email: email, password: password }, { headers: this.headers }).pipe(
      map((user) => {
        this.saveUserToLocalStorage(user)
        this.currentUser$.next(user)
        return user
      }),
      catchError((error: any) => {
        console.log('error:', error)
        console.log('error.message:', error.message)
        console.log('error.error.message:', error.error.message)
        return of(undefined)
      })
    )
  }

  register(userData: User): Observable<User | undefined> {
    console.log(`register at ${environment.apiUrl}register`)
    console.log(userData)
    return this.http
      .post<User>(`${environment.apiUrl}register`, userData, {
        headers: this.headers
      })
      .pipe(
        map((user) => {
          // const user = new User(response);
          console.dir(user)
          this.saveUserToLocalStorage(user)
          this.currentUser$.next(user)
          return user
        }),
        catchError((error: any) => {
          console.log('error:', error)
          console.log('error.message:', error.message)
          console.log('error.error.message:', error.error.message)
          return of(undefined)
        })
      )
  }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(userData: User): Observable<User | undefined> {
    const url = `${environment.apiUrl}profile`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }

    console.log(`validateToken at ${url}`)
    return this.http.get<any>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid')
        return response
      }),
      catchError((error: any) => {
        console.log('Validate token Failed')
        this.logout()
        this.currentUser$.next(undefined)
        return of(undefined)
      })
    )
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info')
          localStorage.removeItem(this.CURRENT_USER)
          this.currentUser$.next(undefined!)
        } else {
          console.log('navigate result:', success)
        }
      })
      .catch((error) => console.log('not logged out!'))
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!)
    return of(localUser)
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user))
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(map((user: User | undefined) => (user ? user._id === itemUserId : false)))
  }
}
