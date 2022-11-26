import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../models/airplane.model';
import { Airport } from '../models/airport.model';
import { User } from '../models/user.model';

const httpOptions = {
  observe: "body",
  responseType: "json",
};

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(protected readonly http: HttpClient) { 
    console.log('AirportService constructor aangeroepen');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    return throwError(() => error);
  }

  getAirports(userData : User, options?: any): Observable<Airport[]> {
    const endpoint = environment.apiUrl + "airports";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Airport[]>(endpoint, {...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  getAirportById(userData : User, id: string, options?: any): Observable<Airport> {
    const endpoint = environment.apiUrl + "airports/" + id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .get<Airport>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }
  

  deleteAirportById(userData : User, id: String, options?: any){
    const endpoint = environment.apiUrl + "airports/" + id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .delete<Airport>(endpoint, { ...options, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  addAirport(userData : User, airport: Airport, options?:any){
    const endpoint = environment.apiUrl + "Airports";
    const httpOptions = {
      headers : new HttpHeaders({
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token
      })
    }
    return this.http
      .post<Airport>(endpoint, { ...options, 
        airportName: airport.airportName,
        address: airport.address,
        buildYear : airport.buildYear,
        country: airport.country,
        gates: airport.gates}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateAirport(userData : User, updatedAirport: Airport, options?: any){
    const endpoint = environment.apiUrl + "airports/" + updatedAirport.id;
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userData.token}`
      }).set("Authorization", `Bearer ${userData.token}`)
    }
    return this.http
      .put<Airplane>(endpoint, {...options,
        id : updatedAirport.id,
        airportName: updatedAirport.airportName,
        address: updatedAirport.address,
        buildYear : updatedAirport.buildYear,
        country: updatedAirport.country,
        gates: updatedAirport.gates}, 
        httpOptions)
      .pipe(tap(console.log), catchError(this.handleError))
  }
}