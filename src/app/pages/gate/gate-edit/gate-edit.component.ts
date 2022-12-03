import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Direction, Gate } from 'src/app/models/gate.model'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { GateService } from 'src/app/services/gate.service'

@Component({
  selector: 'app-gate-edit',
  templateUrl: './gate-edit.component.html',
  styleUrls: ['./gate-edit.component.css']
})
export class GateEditComponent implements OnInit {
  gate: Gate = new Gate()
  gateId: string | null = null

  airportId: string | null = null

  directions = Object.values(Direction)
  dateToday = new Date().toISOString().substring(0, 10)

  currentUser: User | undefined
  sub!: Subscription

  constructor(private gateService: GateService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.route.paramMap.subscribe((params) => {
        this.airportId = params.get('id')
      })
    })
  }

  saveGate(gate: Gate) {
    console.log('Gate add aangeroepen')
    this.route.paramMap.subscribe((params) => {
      this.airportId = params.get('id')
      if (this.gateId) {
        //Update
        console.log(this.gate)
        this.gateService.updateGate(this.currentUser!, String(this.airportId), this.gate).subscribe(() => {
          this.router.navigate([`/airports/${this.airportId}/gates/${this.gateId}`])
        })
      } else {
        //Save
        this.gateService.addGateToAirport(this.currentUser!, String(this.airportId), this.gate).subscribe(() => {
          this.router.navigateByUrl('..', { skipLocationChange: true }).then(() => {
            this.router.navigate([`/airports/${this.airportId}`])
          })
        })
      }
    })
  }

  directionToObject() {
    this.gate.direction = Direction[this.gate.direction]
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.route.paramMap.subscribe((params) => {
        this.gateId = params.get('gateId')
        if (this.gateId) {
          // Existing Airport
          this.gateService.getGateById(this.currentUser!, String(this.airportId), String(this.gateId)).subscribe((gate) => {
            this.gate = gate
          })
        }
      })
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
