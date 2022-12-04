import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'
import { Airplane, WeightClass } from 'src/app/models/airplane.model'
import { Airport } from 'src/app/models/airport.model'
import { Gate } from 'src/app/models/gate.model'
import { User } from 'src/app/models/user.model'
import { AirplaneService } from 'src/app/services/airplane.service'
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

  airplanesUser!: Airplane[]
  selectedAirplane!: Airplane | undefined

  currentAirplane!: Airplane | undefined

  // currentAirplane: Airplane = {
  //   airplaneName: 'placeholder',
  //   model: 'placeholder',
  //   buildYear: new Date(),
  //   fuelCapacity: 1,
  //   length: 1,
  //   wingSpan: 1,
  //   height: 1,
  //   engine: 'placeholder',
  //   weightClass: WeightClass.Small,
  //   id: '',
  //   userId: '',
  //   gateId: '',
  //   currentGate: undefined
  // }

  currentUser: User | undefined
  sub!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gateService: GateService,
    private airportService: AirportService,
    private airplaneService: AirplaneService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private authService: AuthService,
    config: NgbModalConfig
  ) {
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
        try {
          // Get gate id from route
          // Get airport id from route
          this.gateId = params.get('gateId')
          this.airportId = params.get('airportId')
          // Find gate by id
          this.gateService.getGateById(this.currentUser!, String(this.airportId), String(this.gateId)).subscribe((gate) => {
            this.gate = gate
            if (gate.airplaneId != null) {
              this.currentAirplane = gate.currentAirplane
              console.log("airplane user id "+gate.currentAirplane!['userId'])
              console.log("user id "+this.currentUser?.id)
              console.log("bool " + this.currentUser!.id!.localeCompare(this.gate.currentAirplane!['userId']))
            }
          })
          this.airportService.getAirportById(this.currentUser!, String(this.airportId)).subscribe((airport) => {
            this.airport = airport
            this.ownerId = airport.ownerId
          })
          this.airplaneService.getAirplanesFromUser(this.currentUser!, this.currentUser!).subscribe((airplanes) => {
            this.airplanesUser = airplanes
          })
        } catch (error) {}
      })
    })
  }

  saveAirplaneToGate(selectedAirplane: Airplane) {
    console.log('add airplane to gate called')
    if (this.selectedAirplane != null) {
      // Selected a airplane
      this.gateService.AddAirplaneToGate(this.currentUser!, String(this.airportId), String(this.gateId), String(this.selectedAirplane)).subscribe(() => {
        this.router.navigate([`/airports/${this.airportId}/gates/${this.gateId}`])
      })
    } else {
      // No airplane selected
      this.alertService.warn('Please select an airplane', {
        autoClose: true,
        keepAfterRouteChange: true
      })
    }
  }

  removeAirplaneFromGate(selectedAirplane: Airplane){
    console.log('remove airplane to gate called')
    this.gateService.RemoveAirplaneFromGate(this.currentUser!, String(this.airportId), String(this.gateId), String(this.currentAirplane?.id)).subscribe(()=>{
      this.router.navigateByUrl(`/airports/${this.airportId}/gates/${this.gateId}`, { skipLocationChange: true }).then(() => {})
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
