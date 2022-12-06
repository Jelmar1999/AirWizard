import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Gender, User } from 'src/app/models/user.model'
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  genders = Object.values(Gender)
  user: User = new User()
  enviroment = environment
  dateToday = new Date()

  constructor(private userService: UserService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.user)
    delete this.user.id
    this.userService.addUser(this.user).subscribe({
      complete: () => {
        window.scrollTo({
          top: 0,
          left: 0
        })
        this.router.navigate(['login'])
        this.alertService.success('Account has been created!', {
          autoClose: true,
          keepAfterRouteChange: true
        })
      },
      error: (e) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
        console.log('e.error ' + e.error)
        if (e.error === 'User with this email already exists') {
          this.alertService.warn('This emailaddress is already registered', {
            autoClose: true,
            keepAfterRouteChange: true
          })
        }
        if (e.error === 'User with this username already exists') {
          this.alertService.warn('This username is already in use', {
            autoClose: true,
            keepAfterRouteChange: true
          })
        } else {
          console.log(e.error.message)
          this.alertService.error('Could not create account, try again later', {
            autoClose: true,
            keepAfterRouteChange: true
          })
        }
      }
    })
  }

  cancel() {
    this.router.navigate(['login'])
  }
}
