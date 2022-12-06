import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { pipe, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/util/alert/alert.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: []
})
export class UserDetailsComponent implements OnInit {

  userId: string | null = null;
  user: User | null = null;

  currentUser : User | undefined
  sub! : Subscription

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    this.sub = this.authService.currentUser$.subscribe((user)=>{
      this.currentUser = user
      config.backdrop = 'static';
      config.keyboard = false;
    })
  }

  open(content: any) {
    this.modalService.open(content);
  }

  cancel() {
    this.location.back()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Get user id from the route
      this.userId = params.get('id');
      // Find user by id
      this.userService.getUserById(String(this.userId)).subscribe((user) => {
        user.dateOfBirth = new Date(user.dateOfBirth);
        this.user = user;
      })
    });
  }

  deleteUser(){
    this.userService.deleteUser(this.currentUser!, String(this.userId)).subscribe({
      complete: () =>{
        console.log('Changing route')
        this.alertService.success('User has been deleted',{
          autoClose: true,
          keepAfterRouteChange: true
        })
        this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        });
      }
    });
    this.authService.logout()
  }
}
