import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AirplaneService } from 'src/app/services/airplane.service';
import { AlertService } from 'src/app/util/alert/alert.service';
import { Airplane, WeightClass } from '../../../models/airplane.model';

@Component({
  selector: 'app-airplane-details',
  templateUrl: './airplane-details.component.html',
  styleUrls: ['./airplane-details.component.css']
})
export class AirplaneDetailsComponent implements OnInit {
  airplane: Airplane | null = null
  airplaneId: string | null = null
  weight = Object.values(WeightClass)

  dateToday = new Date().toISOString().substring(0,10)
  
  constructor(private route: ActivatedRoute,
     private router: Router, 
     private airplaneService: AirplaneService,
     private alertService: AlertService,
     private modalService: NgbModal,
     config: NgbModalConfig,) {
      config.backdrop = 'static'
      config.keyboard = false
      }
  
  open(content: any) {
    this.modalService.open(content)
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Get airplane id from the route
      this.airplaneId = params.get('id');
      // Find airplane by id
      this.airplaneService.getAirplaneById(String(this.airplaneId)).subscribe((airplane) => {
        airplane.buildYear = new Date(airplane.buildYear);
        this.airplane = airplane;
      })
    })
  }
  gotoAiplanes() {
    this.router.navigate(['/airplanes']);
  }

  deleteAirplane(){
    this.airplaneService.deleteAirplaneById(String(this.airplaneId)).subscribe({
      complete: () =>{
        console.log('Changing route')
        this.alertService.success('Airplane has been deleted',{
          autoClose: true,
          keepAfterRouteChange: true
        })
        this.router.navigateByUrl('/airplanes', { skipLocationChange: true }).then(() => {
          this.airplaneService.getAirplanes().subscribe();
      });
      }
    });
    // this.router.navigate(['../'], { relativeTo: this.route })
  }
}
