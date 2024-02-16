import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule 
  ],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor() { }

  ngOnInit(): void {

  }
}
