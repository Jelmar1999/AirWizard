import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-not-followed-users',
  templateUrl: './not-followed-users.component.html',
  styleUrls: ['./not-followed-users.component.css']
})
export class NotFollowedUsersComponent implements OnInit, OnDestroy {
  notFollowedUsers!: User[]

  currentUser: User | undefined
  sub!: Subscription
  
  constructor(
    private authService: AuthService,
    private socialService: SocialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sub = this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user
        this.socialService.getNotFollowedUsers(this.currentUser!).subscribe((users) => (this.notFollowedUsers = users))
      })
    })
  }

  
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
