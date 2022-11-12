import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { Airplane, Weight } from '../airplane';
import { AIRPLANES } from '../mock-airplanes';

@Component({
  selector: 'app-airplane-details',
  templateUrl: './airplane-details.component.html',
  styleUrls: ['./airplane-details.component.css']
})
export class AirplaneDetailsComponent implements OnInit {
  airplane: Airplane | null = null
  airplaneId: string | null = null
  weight = Object.values(Weight)

  dateToday = new Date().toISOString().substring(0,10)
  
  constructor(private route: ActivatedRoute, private router: Router, private airplaneService: AirplaneService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Get airplane id from the route
      this.airplaneId = params.get('id');
      // Find airplane by id
      this.airplaneService.getAirplaneById(String(this.airplaneId)).subscribe((airplane) => {
        airplane.buildYear = new Date(airplane.buildYear);
        this.airplane = airplane;
      // let foundPlane = AIRPLANES.filter( x => {
      //   return x._id === this.airplaneId;
      })
      // this.airplane = foundPlane[0];
    })
  }
  gotoAiplanes() {
    this.router.navigate(['/airplanes']);
  }

  deleteAirplane(){
    this.airplaneService.deleteAirplaneById(String(this.airplaneId)).subscribe();
    this.router.navigate(['/airplanes'])
  }
}
