import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from '../services/trip-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  addForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripsService
  ) {
    this.addForm = this.formBuilder.group({
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

  addTrip() {
    this.submitted = true; 

    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: () => {
          // Trip added successfully, navigate to some page
          this.router.navigate(['/list-trips']);
        },
        error: (error) => {
          // Handle error
          console.error('Error adding trip:', error);
        }
      });
    }
  }

  get f() { return this.addForm.controls; }
}


