import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { Airplane } from 'src/app/models/airplane.model'
import { Airport } from 'src/app/models/airport.model'
import { Gate } from 'src/app/models/gate.model'
import { User } from 'src/app/models/user.model'
import { AirportService } from 'src/app/services/airport.service'
import { AuthService } from 'src/app/services/auth.service'
import { GateService } from 'src/app/services/gate.service'
import { AlertService } from 'src/app/util/alert/alert.service'

@Component({
  selector: 'app-gate-details',
  templateUrl: './gate-details.component.html',
  styleUrls: ['./gate-details.component.css']
})
export class GateDetailsComponent implements OnInit {
  gate: Gate | null = null
  gateId: string | null = null

  airportId: string | null = null
  airport: Airport | null = null
  ownerId: string | null = null

  currentUser: User | undefined
  sub!: Subscription

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private gateService: GateService, 
    private airportService: AirportService, 
    private alertService: AlertService, 
    private modalService: NgbModal, 
    private authService: AuthService, 
    config: NgbModalConfig) {
    this.route.paramMap.subscribe((params) => {
      this.gateId = params.get('gateId')
      this.airportId = params.get('airportId')
      config.backdrop = 'static'
      config.keyboard = false
    })
  }

  open(content: any) {
    this.modalService.open(content)
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.route.paramMap.subscribe((params) => {
        // Get gate id from route
        // Get airport id from route
        this.gateId = params.get('gateId')
        this.airportId = params.get('airportId')
        // Find gate by id
        this.gateService.getGateById(this.currentUser!, String(this.airportId), String(this.gateId)).subscribe((gate) => {
          this.gate = gate
        })
        this.airportService.getAirportById(this.currentUser!, String(this.airportId)).subscribe((airport) => {
          this.airport = airport
          this.ownerId = airport.ownerId
        })
      })
    })
  }

  deleteGate() {
    this.gateService.deleteGateById(this.currentUser!, String(this.airportId), String(this.gateId)).subscribe({
      complete: () => {
        console.log('Changing route')
        this.alertService.success('Gate has been deleted', {
          autoClose: true,
          keepAfterRouteChange: true
        })
        this.router.navigateByUrl(`/airports/${this.airportId}`, { skipLocationChange: true }).then(() => {})
      }
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
