import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { pipe } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
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

}
