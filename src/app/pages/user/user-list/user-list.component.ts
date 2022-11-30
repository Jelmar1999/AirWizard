import { Component, OnInit } from '@angular/core'
import { map, Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { User } from '../../../models/user.model'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {
  users!: User[]
  selectedId = 0

  currentUser: User | undefined
  sub!: Subscription

  page = 1
  pageSize = 5
  collectionSize = 0

  constructor(
    public authService: AuthService,
    public userService: UserService
    ) {
    this.sub = this.authService.currentUser$.subscribe((user)=>{
      this.currentUser = user
      this.refreshUsers()
    })
  }

  refreshUsers() {
    this.userService
      .getUsers(this.currentUser!)
      .pipe(map((users: User[]) => users.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
      .subscribe((users) => users.map((user) => (user.dateOfBirth = new Date(user.dateOfBirth)), (this.users = users)))
  }

  getCollectionSize() {
    this.userService
      .getUsers(this.currentUser!)
      .pipe(map((users: User[]) => users.length))
      .subscribe((size) => {
        this.collectionSize = size
      })
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString()
  }

  ngOnInit(): void {
    this.refreshUsers()
    this.getCollectionSize()
  }
}
