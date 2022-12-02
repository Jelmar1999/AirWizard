import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { SocialService } from 'src/app/services/social.service'
import { UserService } from 'src/app/services/user.service'
import { AlertService } from 'src/app/util/alert/alert.service'

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {
  userId: string | null = null
  user: User | null = null

  currentUser: User | undefined
  sub!: Subscription

  followed: boolean = false
  followedUsers!: User[]

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private socialService: SocialService,
    private authService: AuthService,
    private alertService: AlertService,
    private location: Location,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static'
    config.keyboard = false
  }

  open(content: any) {
    this.modalService.open(content)
  }

  cancel() {
    this.location.back()
  }

  follow() {
    this.socialService.followUser(this.currentUser!, this.user!).subscribe(() => {
      this.followed = true;
      this.alertService.clear()
      this.alertService.success(`You are now following ${this.user?.firstName} ${this.user?.lastName}`, {autoClose: true})
    })
  }

  unfollow() {
    this.socialService.unfollowUser(this.currentUser!, this.user!).subscribe(() => {
      this.followed = false;
      this.alertService.clear()
      this.alertService.error(`You are no longer following ${this.user?.firstName} ${this.user?.lastName}`, {autoClose: true})
    })
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.socialService.getFollowedUsers(this.currentUser!).subscribe((users) => {
        this.followedUsers = users
        this.route.paramMap.subscribe((params) => {
          this.userId = params.get('id')
          this.userService.getUserById(String(this.userId)).subscribe((user) => {
            user.dateOfBirth = new Date(user.dateOfBirth)
            this.user = user
            this.followedUsers.forEach((u) => {
              if (u.id == this.user!.id) {
                this.followed = true
              }
            })
          })
        })
      })
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
