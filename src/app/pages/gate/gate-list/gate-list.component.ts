import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Subscription } from 'rxjs'
import { Airport } from 'src/app/models/airport.model'
import { Gate } from 'src/app/models/gate.model'
import { User } from 'src/app/models/user.model'
import { AirportService } from 'src/app/services/airport.service'
import { AuthService } from 'src/app/services/auth.service'
import { GateService } from 'src/app/services/gate.service'

@Component({
  selector: 'app-gate-list',
  templateUrl: './gate-list.component.html',
  styleUrls: ['./gate-list.component.css']
})
export class GateListComponent implements OnInit {
  gates!: Gate[]
  selectedId = 0

  airportId: string | null = null
  airport: Airport | null = null
  airportOwnerId: string | null = null

  currentUser: User | undefined
  sub!: Subscription

  page = 1
  pageSize = 8
  collectionSize = 0

  constructor(private authService: AuthService, private gateService: GateService, private airportService: AirportService, private route: ActivatedRoute) {
  }

  refreshGates() {
    if (this.currentUser != undefined) {
      this.gateService
        .getGatesForAirport(this.currentUser!, String(this.airportId))
        .pipe(map((gates: Gate[]) => gates.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
        .subscribe((gates) => gates.map((gate) => (this.gates = gates)))
    }
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.route.paramMap.subscribe((params) => {
        this.airportId = params.get('id')
        this.airportService.getAirportById(this.currentUser!, String(this.airportId)).subscribe((airport) => {
          this.airport = airport
          this.airportOwnerId = airport.ownerId
        })
        this.refreshGates()
      })
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
