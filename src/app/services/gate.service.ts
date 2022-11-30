import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../models/airplane.model';
import { Airport } from '../models/airport.model';
import { Gate } from '../models/gate.model';
import { User } from '../models/user.model';

const httpOptions = {
  observe: "body",
  responseType: "json",
};

@Injectable({
  providedIn: 'root'
})
export class GateService {

  constructor(protected readonly http: HttpClient) { 
    console.log('GateService constructor aangeroepen');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    return throwError(() => error);
  }

  getGates(userData : User, options?: any): Observable<Gate[]> {
    const endpoint = environment.apiUrl + "gates";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Gate[]>(endpoint, {...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getGateById(userData : User, id: string, options?: any): Observable<Gate> {
    const endpoint = environment.apiUrl + "gates/" + id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Gate>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  deleteGateById(userData : User, id: String, options?: any){
    const endpoint = environment.apiUrl + "gates/" + id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .delete<Gate>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  addGateToAirport(userData : User, airportId: string, gate : Gate, options?:any){
    const endpoint = environment.apiUrl + "Airports/" + airportId;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .post<Gate>(endpoint, { ...options, 
        gateName: gate.gateName,
        waitingRoomCapacity: gate.waitingRoomCapacity,
        airport : gate.airport,
        airportId: gate.airportId,
        airportName: gate.airportName}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateGate(userData : User, airportId: string, updatedGate: Gate, options?: any){
    const endpoint = environment.apiUrl + "airports/" + airportId + "/" + updatedGate.id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userData.token}`
      }).set("Authorization", `Bearer ${userData.token}`)
    }
    return this.http
      .put<Airplane>(endpoint, {...options,
        id : updatedGate.id,
        gateName: updatedGate.gateName,
        waitingRoomCapacity: updatedGate.waitingRoomCapacity,}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }
}