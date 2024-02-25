import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    // Initialize component logic here
  }

  public isLoggedIn(): boolean { 
    // Assuming AuthenticationService has a method named isLoggedIn
    return this.authService.isLoggedIn(); 
  }

}
