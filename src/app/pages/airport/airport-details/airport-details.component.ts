import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Airport } from 'src/app/models/airport.model';
import { User } from 'src/app/models/user.model';
import { AirportService } from 'src/app/services/airport.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/util/alert/alert.service';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {
  airport: Airport | null = null
  airportId: string | null = null

  dateToday = new Date().toISOString().substring(0,10)

  currentUser : User | undefined
  sub! : Subscription
  
  constructor(private route: ActivatedRoute,
     private router: Router, 
     private airportService: AirportService,
     private alertService: AlertService,
     private modalService: NgbModal,
     private authService : AuthService,
     config: NgbModalConfig,) {
      config.backdrop = 'static'
      config.keyboard = false
      }
  
  open(content: any) {
    this.modalService.open(content)
  }
  
  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user)=>{
      this.currentUser = user    
      this.route.paramMap.subscribe((params) => {
        // Get airport id from the route
        this.airportId = params.get('id');
        // Find airport by id
        this.airportService.getAirportById(this.currentUser!, String(this.airportId)).subscribe((airplane) => {
          airplane.buildYear = new Date(airplane.buildYear);
          this.airport = airplane;
        })
      })
    })
  }
  gotoAirport() {
    this.router.navigate(['/airports']);
  }

  deleteAirport(){
    this.airportService.deleteAirportById(this.currentUser!, String(this.airportId)).subscribe({
      complete: () =>{
        this.alertService.success('Airport has been deleted',{
          autoClose: true,
          keepAfterRouteChange: true
        })
        this.router.navigateByUrl('/airports', { skipLocationChange: true }).then(() => {
          this.airportService.getAirports(this.currentUser!).subscribe();
      });
      }
    });
    // this.router.navigate(['../'], { relativeTo: this.route })
  }
}
