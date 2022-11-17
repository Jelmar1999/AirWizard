import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscriber, Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container">
        <a
          class="navbar-brand"
          routerLink="/"
          [routerLinkActive]="['active']"
          [routerLinkActiveOptions]="{ exact: true }"
          >{{ title }}</a
        >
        <button
          class="navbar-toggler hidden-sm-up"
          type="button"
          (click)="isNavbarCollapsed = !isNavbarCollapsed"
          data-target="#navbarsDefault"
          aria-controls="navbarsDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- <div *ngIf="loggedInUser$ | async as user" [ngbCollapse]="isNavbarCollapsed" class="collapse navbar-collapse" id="navbarsDefault"> -->
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="dashboard" [routerLinkActive]="['active']">Home</a>
            </li>
            <li class="nav-item dropdown">
              <div ngbDropdown class="d-inline-block">
                <button class="btn btn-link" id="dropdownMenu1" ngbDropdownToggle>Overviews</button>
                <div ngbDropdownMenu class="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    class="dropdown-item"
                    routerLink="airports"
                    [routerLinkActive]="['active']"
                    [routerLinkActiveOptions]="{ exact: true }"
                  >
                    Airports
                  </button>
                  <button
                    class="dropdown-item"
                    routerLink="gates"
                    [routerLinkActive]="['active']"
                    [routerLinkActiveOptions]="{ exact: true }"
                  >
                    Gates
                  </button>
                  <button
                    class="dropdown-item"
                    routerLink="airplanes"
                    [routerLinkActive]="['active']"
                    [routerLinkActiveOptions]="{ exact: true }"
                  >
                    Airplanes
                  </button>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="airplanes"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                >Airplanes</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="users"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                >Users</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="about"
                [routerLinkActive]="['active']"
                [routerLinkActiveOptions]="{ exact: true }"
                >About</a
              >
            </li>
          </ul>
        </div>
      <!-- </div> -->
    </nav>
  `,
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() title: string = ''
  isNavbarCollapsed = true

  loggedInUser$: Observable<User> | undefined
  user: User | undefined
  sub!: Subscription

  constructor(private authService: AuthService){

  }
 
  ngOnInit(): void {
    // this.loggedInUser$ = this.authService.currentUser$
    this.sub = this.authService.currentUser$.subscribe(user => this.user = user)
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  logout(): void{
    this.authService.logout()
  }
}
