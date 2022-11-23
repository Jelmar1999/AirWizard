import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User = new User()
  subs!: Subscription

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.subs = this.authService.getUserFromLocalStorage().subscribe((user: User) => {
      if (user) {
        console.log('User already logged in > to dashboard')
        this.router.navigate(['/dashboard'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  onSubmit() {
    this.alertService.clear()
    this.authService.login(this.user.userName, this.user.password).subscribe((user) => {
      if (user) {
        console.log('Logged in')
        this.router.navigate(['dashboard'])
      } else if(undefined) {
        this.alertService.error('Email and password did not match')
      }
    })
  }
}
