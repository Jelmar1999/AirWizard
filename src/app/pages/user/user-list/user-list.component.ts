import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../services/user.service'
import { Observable } from 'rxjs'
import { map,tap } from 'rxjs/operators'
import { User } from '../user'
import { DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [],
})
export class UserListComponent implements OnInit {
  // users$!: Observable<User[]>
  users! : User[]
  selectedId = 0

  page = 1
  pageSize = 8
  collectionSize = 0;


  constructor(public userService: UserService) {
  }
  
  getCollectionSize(){
    this.userService.getUsers().pipe(
      map((users: User[]) => users.length)).subscribe((size) => {this.collectionSize = size})
  }

  refreshUsers() {
    this.userService.getUsers().subscribe(result => console.log(result))
    this.userService
      .getUsers()
      .pipe(map((users: User[]) =>
          users.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
        ),
        tap(users => console.log(users[0]))
      )
      .subscribe((users) => users.map((user) => (user.birthdate = new Date(user.birthdate)), this.users = users))
  }
  ngOnInit(): void {
    this.refreshUsers()
    this.getCollectionSize()
    console.log(this.collectionSize)
  }
}
