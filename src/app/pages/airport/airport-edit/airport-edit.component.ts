import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Airport } from 'src/app/models/airport.model';
import { Gate } from 'src/app/models/gate.model';
import { User } from 'src/app/models/user.model';
import { AirportService } from 'src/app/services/airport.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-airport-edit',
  templateUrl: './airport-edit.component.html',
  styleUrls: ['./airport-edit.component.css']
})
export class AirportEditComponent implements OnInit {
  gateList: Gate[] = []
  airport: Airport = new Airport()
  airportId: string | null = null

  dateToday = new Date().toISOString().substring(0, 10)

  currentUser : User | undefined
  sub! : Subscription

  constructor(
    private airportService: AirportService, 
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute) { }

  saveAirport(airport: Airport) {
    console.log('Airport add aangeroepen')
    this.airport.buildYear = new Date(this.airport.buildYear)
    if (this.airportId) {
      //Update
      console.log(this.airport)
      this.airportService.updateAirport(this.currentUser!, this.airport).subscribe(() => {
        // this.router.navigate(["/airports/", this.airportsId])
        this.router.navigateByUrl('..', { skipLocationChange: true }).then(()=>{
          this.router.navigate(["/airports/", this.airportId])
        })
      })
    } else{
      //Save
      this.airportService.addAirport(this.currentUser!, this.airport).subscribe(() => {
        // this.router.navigate(['/airports'], { relativeTo: this.route })
        this.router.navigateByUrl('..', { skipLocationChange: true }).then(()=>{
          this.router.navigate(["/airports"])
        })
      })
    }
  }

  // onChangeGateSelect(selectedGate: Gate) {
  //   if (selectedGate.id === this.airport!.gates.) {
  //     console.log('Old home team: ' + this.oldHomeTeamValue.fullName)
  //     this.match!.awayTeam = this.oldHomeTeamValue
  //     this.oldAwayTeamValue = this.match!.awayTeam
  //   }
  //   this.airport.gates?.push(selectedGate)
  // }

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user)=>{
      this.currentUser = user    
      this.route.paramMap.subscribe((params) => {
        this.airportId = params.get('id')
        if (this.airportId) {
          // Existing Airport
          this.airportService.getAirportById(this.currentUser!, String(this.airportId)).subscribe((airport) => {
            this.airport = { ...airport }
          })
        }
      })
    })
  }
}
