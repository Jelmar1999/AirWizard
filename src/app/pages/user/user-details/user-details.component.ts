import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service'
import { Gender, User } from '../user'

declare function displaybuttons(): void;
declare function removeButtons(): void;
declare function makeInputFieldsEditable(): void;
declare function closeInputFields(): void;
declare function updateUser(user: any): void;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // user$!: Observable<User>;
  user: User | null = null
  userId: string | null = null
  genders = Object.values(Gender)
  dateToday = new Date().toISOString().substring(0,10)
  
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Get user id from the route
      this.userId = params.get('id');
      // Find user by id
      this.userService.getUserById(String(this.userId)).subscribe((user) => {
        this.user = user, this.user.birthdate = new Date(user.birthdate);
      })
    });
  }
  gotoUsers() {
    this.router.navigate(['/users']);
  }

  deleteUser(){
    this.userService.deleteUserById(String(this.userId)).subscribe();
    this.router.navigate(['/users'])
  }

}
