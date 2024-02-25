import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Removed 'ReactiveFormsModule'
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../services/trip-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  editForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      // Form controls initialization
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.tripService.getTrip(this.activatedRoute.snapshot.params['tripCode']).subscribe({
      next: (trip) => {
        this.editForm.setValue(trip); 
      },
      error: (error) => console.error('Error fetching trip:', error)
    });
  }

  updateTrip() {
    this.submitted = true; 
  
    if (this.editForm.valid) {
      const tripCode = this.activatedRoute.snapshot.params['tripCode'];
      this.tripService.updateTrip(tripCode, this.editForm.value).subscribe({
        next: () => {
          // Trip updated successfully, navigate to some page
          this.router.navigate(['/list-trips']);
        },
        error: (error) => {
          // Handle error
          console.error('Error updating trip:', error);
        }
      });
    }
  }

  get f() { return this.editForm.controls; }
}
