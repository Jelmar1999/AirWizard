import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { Airplane, Weight } from '../airplane';

@Component({
  selector: 'app-airplane-edit',
  templateUrl: './airplane-edit.component.html',
  styleUrls: ['./airplane-edit.component.css']
})
export class AirplaneEditComponent implements OnInit {
  airplane: Airplane = new Airplane()
  airplaneId: string | null = null
  weights = Object.values(Weight)
  dateToday = new Date().toISOString().substring(0, 10)

  constructor(private airplaneService: AirplaneService, private router: Router, private route: ActivatedRoute) { }

  dateToObject(){
    this.airplane.buildyear = new Date(this.airplane.buildyear)
  }

  weightToObject(){
    this.airplane.weight = Weight[this.airplane.weight]
  }

  saveAirplane(airplane: Airplane) {
    console.log('airplane add aangeroepen')
    this.airplane.weight = Weight[this.airplane.weight]
    this.airplane.buildyear = new Date(this.airplane.buildyear)
    if (this.airplaneId) {
      //Update
      console.log(this.airplane)
      this.airplaneService.updateAirplane(this.airplane).subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route })
      })
    } else{
      //Save
      this.airplaneService.addAirplane(this.airplane).subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route })
      })
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.airplaneId = params.get('id')
      if (this.airplaneId) {
        // Existing Airplane
        this.airplaneService.getAirplaneById(String(this.airplaneId)).subscribe((airplane) => {
          this.airplane = { ...airplane }
        })
      }
    })
  }
}
