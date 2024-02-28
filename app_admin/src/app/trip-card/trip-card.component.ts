import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';

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
  @Input() trip: any;
  @Input() isLoggedIn$?: Observable<boolean>;
  @Output() onDelete = new EventEmitter<void>(); 
  constructor() { }

  ngOnInit(): void { }

  deleteTrip(): void {
    this.onDelete.emit(); 
  }
}
