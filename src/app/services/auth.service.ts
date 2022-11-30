import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { User } from '../models/user.model'
import { AlertService } from '../util/alert/alert.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User>(undefined!)
  private readonly CURRENT_USER = 'currentuser'
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
    console.log("Authservice Constructor")
    this.getUserFromLocalStorage()
      .pipe(
        map((user : User) => {
          if(user){
            console.log("User found in local storage")
            this.currentUser$.next(user)
            return user.token
          }else{
            console.log("No current user found")
            return of(undefined)
          }
        })
      ).subscribe()
      
  }

  login(userName: string, password: string): Observable<User | null | undefined> {
    console.log(`login at ${environment.apiUrl}user/login`)

    return this.http
      .post<User>(
        `${environment.apiUrl}user/login`,
        { UserName: userName, 
          password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          let transformUser = new User;
          transformUser.token = user.token
          transformUser.id = user.id
          transformUser.userName = user.userName
          transformUser.firstName = user.firstName
          transformUser.lastName = user.lastName
          transformUser.email = user.email
          transformUser.phoneNumber = user.phoneNumber
          transformUser.dateOfBirth = user.dateOfBirth
          transformUser.gender = user.gender
          transformUser.ownedAirplanes = user.ownedAirplanes
          this.saveUserToLocalStorage(transformUser)
          this.currentUser$.next(transformUser)
          this.alertService.success("Succesfully logged in!", {
            autoClose: true,
            keepAfterRouteChange: true,
        })
          return user
        }),
        catchError((error: any) => {
          console.log('error:', error)
          console.log('error.message:', error.message)
          console.log('error.error.message:', error.error.message)
          this.alertService.error(error.error.message || error.message),{
            autoClose: true,
            keepAfterRouteChange: true
          };
          return of(undefined)
        })
      )
  }

  // validateToken(userData: User): Observable<User | null | undefined> {
  //   const url = `${environment.apiUrl}validateToken`
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + userData.token
  //     })
  //   }

  //   console.log(`validateToken at ${url}`)
  //   console.log(userData)
  //   console.log(userData.token)
  //   return this.http.get<any>(url, httpOptions).pipe(
  //     map((response) => {
  //       console.log('token is valid')
  //       return response
  //     }),
  //     catchError((error: any) => {
  //       console.log('Validate token Failed')
  //       this.logout()
  //       this.currentUser$.next(undefined!)
  //       return of(undefined!)
  //     })
  //   )
  // }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info')
          localStorage.removeItem(this.CURRENT_USER)
          this.currentUser$.next(undefined!)
          this.alertService.success("Succesfully logged out!", {
            autoClose: true,
            keepAfterRouteChange: true
        })
        } else {
          console.log('navigate result:', success)
        }
      })
      .catch((error) => console.log('not logged out!'))
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!)
    // console.log(localUser)
    return of(localUser)
  }

  isLoggedIn(): boolean {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!)
    if (localUser == null) {
      return false
    }
    return true
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user))
    // console.log(JSON.stringify(user))
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(map((user: User) => (user ? user.id === itemUserId : false)))
  }
}
