import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscriber, Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { AlertService } from 'src/app/util/alert/alert.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() title: string = ''
  isNavbarCollapsed = true

  user: User | undefined
  sub!: Subscription

  constructor(private authService: AuthService, private alertService: AlertService){
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => (this.user = user))
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  logout(): void{
    this.authService.logout()
  }
}
