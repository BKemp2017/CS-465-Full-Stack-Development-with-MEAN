import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripsService } from '../services/trip-data.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [
    CommonModule,
    TripCardComponent 
  ],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripsService]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripsService: TripsService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe({
      next: (results: Trip[]) => {
        this.trips = results;
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
        // Optionally, handle the error by showing a user-friendly message
      }
    });
  }

  addTrip() {
    this.router.navigate(['add-trip']); 
  }
}
