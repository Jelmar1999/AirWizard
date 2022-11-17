import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../models/airplane.model';

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

  getAirplanes(options?: any): Observable<Airplane[]> {
    const endpoint = environment.apiUrl + "airplanes";
    return this.http
      .get<Airplane[]>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getAirplaneById(id: string, options?: any): Observable<Airplane> {
    const endpoint = environment.apiUrl + "airplanes/" + id;
    return this.http
      .get<Airplane>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }
  

  deleteAirplaneById(id: String, options?: any){
    const endpoint = environment.apiUrl + "airplanes/" + id;
    return this.http
      .delete<Airplane>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  addAirplane(airplane: Airplane, options?:any){
    const endpoint = environment.apiUrl + "Airplanes";
    const httpOptions = new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
    })
    // const Json = {
    //   airplaneName: airplane.airplaneName,
    //   model: airplane.model,
    //   buildYear: airplane.buildYear,
    //   fuelCapacity: airplane.fuelCapacity,
    //   length: airplane.length,
    //   wingspan: airplane.wingspan,
    //   heigth: airplane.heigth,
    //   engine: airplane.engine,
    //   weight: airplane.weight
    // }
    return this.http
      .post<Airplane>(endpoint, { ...options, 
        airplaneName: airplane.airplaneName,
        model: airplane.model,
        buildYear: airplane.buildYear,
        fuelCapacity: airplane.fuelCapacity,
        length: airplane.length,
        wingspan: airplane.wingSpan,
        heigth: airplane.heigth,
        engine: airplane.engine,
        weightClass: airplane.weightClass, 
        ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateAirplane(updatedAirplane: Airplane, options?: any){
    const endpoint = environment.apiUrl + "airplanes/" + updatedAirplane.id;
    return this.http
      .put<Airplane>(endpoint, { ...options,
        id : updatedAirplane.id,
        airplaneName: updatedAirplane.airplaneName,
        model: updatedAirplane.model,
        buildYear: updatedAirplane.buildYear,
        fuelCapacity: updatedAirplane.fuelCapacity,
        length: updatedAirplane.length,
        wingspan: updatedAirplane.wingSpan,
        heigth: updatedAirplane.heigth,
        engine: updatedAirplane.engine,
        weightClass: updatedAirplane.weightClass, 
          ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

}