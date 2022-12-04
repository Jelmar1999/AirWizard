import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../models/airplane.model';
import { Airport } from '../models/airport.model';
import { Gate } from '../models/gate.model';
import { User } from '../models/user.model';
import { AlertService } from '../util/alert/alert.service';

const httpOptions = {
  observe: "body",
  responseType: "json",
};

@Injectable({
  providedIn: 'root'
})
export class GateService {

  constructor(protected readonly http: HttpClient, private alertService: AlertService) { 
    console.log('GateService constructor aangeroepen');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    return throwError(() => error);
  }

  getGatesForAirport(userData : User, airportId: string,  options?: any): Observable<Gate[]> {
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates";
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

  getGateById(userData : User, airportId: string, gateId: string, options?: any): Observable<Gate> {
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates/" + gateId;
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

  AddAirplaneToGate(userData : User, airportId: string, gateId: string, airplaneId: string, options?: any): Observable<Gate | null | undefined> {
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates/" + gateId + "/airplane/" + airplaneId + "/add";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .put<Gate>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), 
      catchError((error: any) =>{
        console.log(error)
        this.alertService.error(error.error || error.message),{
          autoClose: true,
          keepAfterRouteChange: true
        };
        return of(undefined)
      }))
  }
  
  RemoveAirplaneFromGate(userData : User, airportId: string, gateId: string, airplaneId: string, options?: any): Observable<Gate| null | undefined> {
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates/" + gateId + "/airplane/" + airplaneId + "/remove";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .put<Gate>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), 
      catchError((error: any) =>{
        console.log(error)
        this.alertService.success(error.error.text || error.message),{
          autoClose: true,
          keepAfterRouteChange: true
        };
        return of(undefined)
      }))
  }
  
  deleteGateById(userData : User,airportId: string, gateId: String, options?: any){
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates/"+ gateId +"/delete";
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
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates/new";
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
        isAvailable: gate.isAvailable,
        direction: gate.direction}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateGate(userData : User, airportId: string, updatedGate: Gate, options?: any){
    const endpoint = environment.apiUrl + "airports/" + airportId + "/gates/" + updatedGate.id + '/edit';
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .put<Gate>(endpoint, {...options,
        id : updatedGate.id,
        gateName: updatedGate.gateName,
        waitingRoomCapacity: updatedGate.waitingRoomCapacity,
        isAvailable: updatedGate.isAvailable,
        direction: updatedGate.direction
        }, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }
}