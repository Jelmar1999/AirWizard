import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
import { map, Subscription } from 'rxjs'
import { Airport } from 'src/app/models/airport.model'
import { Gate } from 'src/app/models/gate.model'
import { User } from 'src/app/models/user.model'
import { AirportService } from 'src/app/services/airport.service'
import { AuthService } from 'src/app/services/auth.service'
import { GateService } from 'src/app/services/gate.service'
import { AlertService } from 'src/app/util/alert/alert.service'

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
  airport: Airport | null = null
  airportId: string | null = null
  gates!: Gate[]

  page = 1
  pageSize = 8
  collectionSize = 0;

  currentUser: User | undefined
  sub!: Subscription

  constructor(
    private route: ActivatedRoute, 
    private gateService: GateService,
    private router: Router, 
    private airportService: AirportService, 
    private alertService: AlertService, 
    private modalService: NgbModal, 
    private authService: AuthService, 
    config: NgbModalConfig) {
      this.sub = this.authService.currentUser$.subscribe((user)=>{
        this.currentUser = user
        this.route.paramMap.subscribe((params) => {
          this.airportId = params.get('id')
          config.backdrop = 'static'
          config.keyboard = false
        })
      })
  }


  open(content: any) {
    this.modalService.open(content)
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.route.paramMap.subscribe((params) => {
        // Get airport id from the route
        this.airportId = params.get('id')
        // Find airport by id
        this.airportService.getAirportById(this.currentUser!, String(this.airportId)).subscribe((airplane) => {
          airplane.buildYear = new Date(airplane.buildYear)
          this.airport = airplane
        })
      })
    })
  }
  gotoAirport() {
    this.router.navigate(['/airports'])
  }

  deleteAirport() {
    this.airportService.deleteAirportById(this.currentUser!, String(this.airportId)).subscribe({
      complete: () => {
        this.alertService.success('Airport has been deleted', {
          autoClose: true,
          keepAfterRouteChange: true
        })
        this.router.navigateByUrl('/airports', { skipLocationChange: true }).then(() => {
          this.airportService.getAirports(this.currentUser!).subscribe()
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
