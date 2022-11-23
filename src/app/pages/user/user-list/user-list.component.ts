import { Component, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { User } from '../../../models/user.model'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {
  // users$!: Observable<User[]>
  users!: User[]
  selectedId = 0

  page = 1
  pageSize = 5
  collectionSize = 0

  constructor(public userService: UserService) {
    this.refreshUsers()
  }

  refreshUsers() {
    this.userService
      .getUsers()
      .pipe(
        map((users: User[]) =>
          users.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
        )
      )
      .subscribe((users) => users.map((user) => (user.dateOfBirth = new Date(user.dateOfBirth)), this.users = users))
    console.log(this.users)
  }

  getCollectionSize() {
    this.userService
      .getUsers()
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
