import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private readonly API_BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http.get<Trip[]>(`${this.API_BASE_URL}/trips`).pipe(
      catchError(this.handleError)
    );
  }

  public addTrip(newTrip: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip', newTrip);
    return this.http.post<Trip>(`${this.API_BASE_URL}/trips`, newTrip).pipe(
      catchError(this.handleError)
    );
  }

  public getTrip(code: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip', code);
    return this.http.get<Trip>(`${this.API_BASE_URL}/trips/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  public updateTrip(code: string, trip: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip', code, trip);
    return this.http.put<Trip>(`${this.API_BASE_URL}/trips/${code}`, trip).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Something has gone wrong', error);
    // You can customize the error message or handle different types of errors here
    return throwError(() => new Error('An error occurred, please try again later.'));
  }
}
