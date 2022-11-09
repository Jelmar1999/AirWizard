import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { User, Gender } from '../user'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = new User()
  userId: string | null = null
  genders = Object.values(Gender)
  dateToday = new Date().toISOString().substring(0, 10)

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}
  
  dateToObject(){
    this.user.birthdate = new Date(this.user.birthdate)
  }

  genderToObject(){
    this.user.gender = Gender[this.user.gender]
  }

  saveUser(user: User) {
    console.log('user add aangeroepen')
    this.user.gender = Gender[this.user.gender]
    this.user.birthdate = new Date(this.user.birthdate)
    if (this.userId) {
      //update
      this.userService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['..'], {relativeTo: this.route})
      } )
    } else {
      //save
      this.user._id = this.userService.getNewId()
      this.userService.addUser(user).subscribe(() => {
        this.router.navigate(['..'], {relativeTo: this.route})
      })
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')
      if (this.userId) {
        // Existing user
        this.userService.getUserById(this.userId).subscribe((user) => {
          this.user = {...user}
        })
      }
    })
  }
}
