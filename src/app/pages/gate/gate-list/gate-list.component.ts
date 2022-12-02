import { Component, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Gate } from 'src/app/models/gate.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GateService } from 'src/app/services/gate.service';

@Component({
  selector: 'app-gate-list',
  templateUrl: './gate-list.component.html',
  styleUrls: ['./gate-list.component.css']
})
export class GateListComponent implements OnInit {
  gates!: Gate[]
  selectedId = 0
  
  currentUser : User | undefined
  sub! : Subscription
  
  page = 1
  pageSize = 8
  collectionSize = 0;
  
  constructor(
    public authService: AuthService,
    public gateService: GateService
  
    ) {
      this.sub = this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user
        this.refreshGates() 
      })
   }
  
  getCollectionSize(){
    this.gateService.getGates(this.currentUser!).pipe(
      map((gates: Gate[]) => gates.length)).subscribe((size) => {this.collectionSize = size})
  }
  
  
  refreshGates() {
    this.gateService
      .getGates(this.currentUser!)
      .pipe(
        map((gates: Gate[]) =>
          gates.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize),
        )
      )
      .subscribe((gates) => gates.map((gate) => this.gates = gates))
  }
  
  formatDate(date: string) {
    return new Date(date).toLocaleDateString()
  }
  
  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe((user)=>{
      this.currentUser = user   
      this.getCollectionSize() 
      this.refreshGates()
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
