import { Component, OnInit } from '@angular/core'
import { map, Subscription } from 'rxjs'
import { Airport } from 'src/app/models/airport.model'
import { User } from 'src/app/models/user.model'
import { AirportService } from 'src/app/services/airport.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {
  // airplane$!: Observable<Airplane[]>
  airports!: Airport[]
  selectedId = 0

  currentUser: User | undefined
  sub!: Subscription

  page = 1
  pageSize = 8
  collectionSize = 0

  constructor(public authService: AuthService, public airportService: AirportService) {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.refreshAirports()
    })
  }

  getCollectionSize() {
    this.airportService
      .getAirports(this.currentUser!)
      .pipe(map((airports: Airport[]) => airports.length))
      .subscribe((size) => {
        this.collectionSize = size
      })
  }

  refreshAirports() {
    this.airportService
      .getAirports(this.currentUser!)
      .pipe(map((airports: Airport[]) => airports.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
      .subscribe((airports) => airports.map((airport) => ((airport.gates = []), (airport.buildYear = new Date(airport.buildYear))), (this.airports = airports)))
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString()
  }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.getCollectionSize()
      this.refreshAirports()
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
