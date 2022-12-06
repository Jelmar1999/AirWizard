import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
import { AuthService } from 'src/app/services/auth.service'
import { AlertService } from 'src/app/util/alert/alert.service'
import { Airplane, WeightClass } from '../../../models/airplane.model'

@Component({
  selector: 'app-airplane-details',
  templateUrl: './airplane-details.component.html',
  styleUrls: ['./airplane-details.component.css']
})
export class AirplaneDetailsComponent implements OnInit {
  airplane: Airplane | null = null
  airplaneId: string | null = null

  isOwner: boolean = false

  weight = Object.values(WeightClass)

  dateToday = new Date().toISOString().substring(0, 10)

  currentUser: User | undefined
  sub!: Subscription

  constructor(private route: ActivatedRoute, private router: Router, private airplaneService: AirplaneService, private alertService: AlertService, private modalService: NgbModal, private authService: AuthService, config: NgbModalConfig) {
    config.backdrop = 'static'
    config.keyboard = false
  }

  open(content: any) {
    this.modalService.open(content)
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.route.paramMap.subscribe((params) => {
        // Get airplane id from the route
        this.airplaneId = params.get('id')
        // Find airplane by id
        this.airplaneService.getAirplaneById(this.currentUser!, String(this.airplaneId)).subscribe((airplane) => {
          airplane.buildYear = new Date(airplane.buildYear)
          this.airplane = airplane
          if (this.currentUser?.id == airplane.userId) {
            this.isOwner = true
          }
        })
      })
    })
  }
  gotoAiplanes() {
    this.router.navigate(['/airplanes'])
  }

  goBack() {
    if (this.airplane?.userId == this.currentUser?.id) {
      this.router.navigateByUrl('/airplanes')
    } else {
      this.router.navigateByUrl(`/social/user/${this.airplane?.userId}`)
    }
  }

  deleteAirplane() {
    this.airplaneService.deleteAirplaneById(this.currentUser!, String(this.airplaneId)).subscribe({
      complete: () => {
        console.log('Changing route')
        this.alertService.success('Airplane has been deleted', {
          autoClose: true,
          keepAfterRouteChange: true
        })
        this.router.navigateByUrl('/airplanes', { skipLocationChange: true }).then(() => {
          this.airplaneService.getAirplanes(this.currentUser!).subscribe()
        })
      }
    })
    // this.router.navigate(['../'], { relativeTo: this.route })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
