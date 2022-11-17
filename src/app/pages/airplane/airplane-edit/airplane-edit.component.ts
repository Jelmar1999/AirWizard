import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { Airplane, WeightClass } from '../../../models/airplane.model';

@Component({
  selector: 'app-airplane-edit',
  templateUrl: './airplane-edit.component.html',
  styleUrls: ['./airplane-edit.component.css']
})
export class AirplaneEditComponent implements OnInit {
  airplane: Airplane = new Airplane()
  airplaneId: string | null = null
  weights = Object.values(WeightClass)
  dateToday = new Date().toISOString().substring(0, 10)

  constructor(
    private airplaneService: AirplaneService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  weightToObject(){
    this.airplane.weightClass = WeightClass[this.airplane.weightClass]
  }

  saveAirplane(airplane: Airplane) {
    console.log('airplane add aangeroepen')
    this.airplane.weightClass = WeightClass[this.airplane.weightClass]
    this.airplane.buildYear = new Date(this.airplane.buildYear)
    if (this.airplaneId) {
      //Update
      console.log(this.airplane)
      this.airplaneService.updateAirplane(this.airplane).subscribe(() => {
        // this.router.navigate(['..'], { relativeTo: this.route })
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.router.navigate(["../"])
        })
      })
    } else{
      //Save
      this.airplaneService.addAirplane(this.airplane).subscribe(() => {
        // this.router.navigate(['..'], { relativeTo: this.route })
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(()=>{
          this.router.navigate(["/airplanes"])
        })
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
