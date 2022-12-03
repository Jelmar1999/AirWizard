import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../models/airplane.model';
import { User } from '../models/user.model';

const httpOptions = {
  observe: "body",
  responseType: "json",
};

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  constructor(protected readonly http: HttpClient) { 
    console.log('AirplaneService constructor aangeroepen');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    return throwError(() => error);
  }

  getAirplanes(userData : User, options?: any): Observable<Airplane[]> {
    const endpoint = environment.apiUrl + "airplanes";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Airplane[]>(endpoint, {...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getAirplanesFromUser(userData : User, lookupUser : User, options?: any): Observable<Airplane[]> {
    const endpoint = environment.apiUrl + "user/" + lookupUser.id + "/fromuser";
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Airplane[]>(endpoint, {...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }
  getAirplaneById(userData : User, id: string, options?: any): Observable<Airplane> {
    const endpoint = environment.apiUrl + "airplanes/" + id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Airplane>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }
  

  deleteAirplaneById(userData : User, id: String, options?: any){
    const endpoint = environment.apiUrl + "airplanes/" + id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .delete<Airplane>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  addAirplane(userData : User, airplane: Airplane, options?:any){
    const endpoint = environment.apiUrl + "Airplanes";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .post<Airplane>(endpoint, { ...options, 
        airplaneName: airplane.airplaneName,
        model: airplane.model,
        buildYear: airplane.buildYear,
        fuelCapacity: airplane.fuelCapacity,
        length: airplane.length,
        wingSpan: airplane.wingSpan,
        height: airplane.height,
        engine: airplane.engine,
        weightClass: airplane.weightClass}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateAirplane(userData : User, updatedAirplane: Airplane, options?: any){
    const endpoint = environment.apiUrl + "airplanes/" + updatedAirplane.id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userData.token}`
      }).set("Authorization", `Bearer ${userData.token}`)
    }
    return this.http
      .put<Airplane>(endpoint, {...options,
        id : updatedAirplane.id,
        airplaneName: updatedAirplane.airplaneName,
        model: updatedAirplane.model,
        buildYear: updatedAirplane.buildYear,
        fuelCapacity: updatedAirplane.fuelCapacity,
        length: updatedAirplane.length,
        wingSpan: updatedAirplane.wingSpan,
        height: updatedAirplane.height,
        engine: updatedAirplane.engine,
        weightClass: updatedAirplane.weightClass,
        userId: userData.id}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }

}