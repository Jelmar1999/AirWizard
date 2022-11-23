import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AirplaneService } from 'src/app/services/airplane.service';
import { AuthService } from 'src/app/services/auth.service';
import { Airplane } from '../../../models/airplane.model';
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

  currentUser : User | undefined
  sub! : Subscription

  page = 1
  pageSize = 8
  collectionSize = 0;

  constructor(
    public authService: AuthService,
    public airplaneService: AirplaneService

    ) {
      this.sub = this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user
        this.refreshAirplanes() 
      })
   }

  getCollectionSize(){
    this.airplaneService.getAirplanes(this.currentUser!).pipe(
      map((airplanes: Airplane[]) => airplanes.length)).subscribe((size) => {this.collectionSize = size})
  }

  refreshAirplanes() {
    this.airplaneService
      .getAirplanes(this.currentUser!)
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
    this.sub = this.authService.currentUser$.subscribe((user)=>{
      this.currentUser = user    
      this.refreshAirplanes()
      this.getCollectionSize()
      console.log(this.collectionSize)
    })
  }
}
