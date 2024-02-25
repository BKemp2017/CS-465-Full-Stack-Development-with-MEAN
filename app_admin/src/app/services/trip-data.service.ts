import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private readonly API_BASE_URL = 'http://localhost:3000/api';

  private token?: string | null;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.authService.tokenSubject.subscribe(t => this.token = t);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    const headers = this.getHeaders(); // Use headers with Authorization token
    return this.http.get<Trip[]>(`${this.API_BASE_URL}/trips`, { headers }).pipe( // Include headers in the request
      catchError(this.handleError)
    );
  }

  public addTrip(newTrip: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip', newTrip);
    const headers = this.getHeaders();
    return this.http.post<Trip>(`${this.API_BASE_URL}/trips`, newTrip, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public getTrip(code: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip', code);
    const headers = this.getHeaders(); // Use headers with Authorization token
    return this.http.get<Trip>(`${this.API_BASE_URL}/trips/${code}`, { headers }).pipe( // Include headers in the request
      catchError(this.handleError)
    );
  }

  public updateTrip(code: string, trip: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip', code, trip);
    const headers = this.getHeaders();
    return this.http.put<Trip>(`${this.API_BASE_URL}/trips/${code}`, trip, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteTrip(tripId: string): Observable<any> {
    const headers = this.getHeaders(); // Ensure you're including the authorization headers
    return this.http.delete(`${this.API_BASE_URL}/trips/${tripId}`, { headers }).pipe(
      catchError(this.handleError) // Leverage the existing error handling method
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Something has gone wrong', error);
    // You can customize the error message or handle different types of errors here
    return throwError(() => new Error('An error occurred, please try again later.'));
  }
}
