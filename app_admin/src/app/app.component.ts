import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TripListingComponent } from './trip-listing/trip-listing.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppRoutingModule,
    TripListingComponent 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'Traveler Admin';
}

