import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppRoutingModule,
    TripListingComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'Traveler Admin';

  private user?: User | null;

  constructor(private authService: AuthenticationService) {
    this.authService.userSubject.subscribe(u => this.user = u);
  }

  isLoggedIn(): boolean {
    const loggedIn = this.authService.tokenSubject.getValue() !== null;
    console.log('Is Logged In:', loggedIn);
    return loggedIn;
  }
  

  logout() {
    this.authService.logout();
  }

}

