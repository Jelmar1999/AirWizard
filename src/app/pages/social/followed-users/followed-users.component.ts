import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { SocialService } from 'src/app/services/social.service'

@Component({
  selector: 'app-followed-users',
  templateUrl: './followed-users.component.html',
  styleUrls: ['./followed-users.component.css']
})
export class FollowedUsersComponent implements OnInit, OnDestroy {
  followedUsers!: User[]

  currentUser: User | undefined
  sub!: Subscription

  constructor(
    private authService: AuthService,
    private socialService: SocialService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.socialService
        .getFollowedUsers(this.currentUser!)
        .subscribe((users) => (this.followedUsers = users))
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
