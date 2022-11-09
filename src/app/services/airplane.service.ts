import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airplane } from '../pages/airplane/airplane';

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
    const endpoint = environment.apiUrl + "airplanes";
    return this.http
      .post<Airplane>(endpoint, { ...options, airplane, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

  updateAirplane(updatedAirplane: Airplane, options?: any){
    const endpoint = environment.apiUrl + "airplanes/" + updatedAirplane._id;
    return this.http
      .put<Airplane>(endpoint, { ...options, updatedAirplane, ...httpOptions})
      .pipe(tap(console.log), catchError(this.handleError))
  }

}