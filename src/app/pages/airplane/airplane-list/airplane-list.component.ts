import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AirplaneService } from 'src/app/services/airplane.service';
import { Airplane } from '../airplane';
// import { AIRPLANES } from '../mock-airplanes';

@Component({
  selector: 'app-airplane-list',
  templateUrl: './airplane-list.component.html',
  styleUrls: ['./airplane-list.component.css']
})
export class AirplaneListComponent implements OnInit {
  // airplane$!: Observable<Airplane[]>
  airplanes!: Airplane[]
  selectedId = 0

  page = 1
  pageSize = 8
  collectionSize = 0;

  constructor(public airplaneService: AirplaneService) {
    this.refreshAirplanes()
   }

  getCollectionSize(){
    this.airplaneService.getAirplanes().pipe(
      map((airplanes: Airplane[]) => airplanes.length)).subscribe((size) => {this.collectionSize = size})
  }

  refreshAirplanes() {
    this.airplaneService
      .getAirplanes()
      .pipe(
        map((airplanes: Airplane[]) =>
          airplanes.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
        )
      )
      .subscribe((airplanes) => airplanes.map((airplane) => (airplane.buildYear = new Date(airplane.buildYear)), this.airplanes = airplanes))
    // this.airplanes = AIRPLANES;
    
    console.log(this.airplanes)
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString()
  }

  ngOnInit(): void {
    this.refreshAirplanes()
    this.getCollectionSize()
    console.log(this.collectionSize)
  }
}
