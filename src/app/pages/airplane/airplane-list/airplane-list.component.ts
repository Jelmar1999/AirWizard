import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Observable, Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'
import { Airplane } from '../../../models/airplane.model'

@Component({
  selector: 'app-airplane-list',
  templateUrl: './airplane-list.component.html',
  styleUrls: ['./airplane-list.component.css']
})
export class AirplaneListComponent implements OnInit {
  airplanes!: Airplane[]

  currentUser: User | undefined
  sub!: Subscription

  userId: string | null = null
  user: User | null = null

  lookingAtOwnPlanes: boolean | undefined
  urlAirplanes: string | null = null

  page = 1
  pageSize = 8
  collectionSize = 0

  constructor(public authService: AuthService, public airplaneService: AirplaneService, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((loginUser) => {
      this.currentUser = loginUser
      this.route.paramMap.subscribe((params) => {
        if (params.get('id') != null) {
          this.userId = params.get('id')
        }
        this.urlAirplanes = this.route.snapshot.url[0].path
        if (this.urlAirplanes.match('airplanes')) {
          this.lookingAtOwnPlanes = true
        } else {
          this.lookingAtOwnPlanes = false
        }
        if (this.userId) {
          this.userService.getUserById(String(this.userId)).subscribe((user) => {
            this.user = user
            this.refreshAirplanes()
          })
        } else {
          this.sub = this.authService.currentUser$.subscribe((user) => {
            this.user = user
            this.refreshAirplanes()
          })
        }
      })
    })
  }

  ngOnDestroy(): void {
    if (!this.userId) {
      this.sub.unsubscribe()
    }
  }

  refreshAirplanes() {
    if (this.user != undefined && this.currentUser != undefined) {
      this.airplaneService
        .getAirplanesFromUser(this.currentUser!, this.user!)
        .pipe(
          map((airplanes: Airplane[]) => {
            return airplanes.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
          })
        )
        .subscribe((airplanes) => airplanes.map((airplane) => (airplane.buildYear = new Date(airplane.buildYear)), (this.airplanes = airplanes)))
    }
  }
}
