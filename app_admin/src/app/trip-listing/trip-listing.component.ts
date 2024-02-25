import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripsService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [
    CommonModule,
    TripCardComponent
  ],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor(
    private tripsService: TripsService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.tokenSubject.pipe(map(token => !!token));
  }

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe({
      next: (results: Trip[]) => this.trips = results,
      error: (err) => console.error('Error fetching trips:', err)
    });
  }

  addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  deleteTrip(code: string): void {
    // Call the service to delete the trip from the backend
    this.tripsService.deleteTrip(code).subscribe({
      next: () => {
        // Update the local trips list by removing the deleted trip
        this.trips = this.trips.filter(trip => trip.code !== code);
      },
      error: (err) => console.error('Error deleting trip:', err)
    });
  }
}


