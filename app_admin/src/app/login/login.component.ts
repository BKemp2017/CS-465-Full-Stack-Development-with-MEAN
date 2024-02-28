import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false; 
  loginError?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if(this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value)
          .subscribe({
              next: () => this.router.navigate(['/list-trips']), // Redirect to trip-listing page
              error: e => this.loginError = e.message
          })
    }
  }
  
    // Method to navigate to the registration page
    navigateToRegister() {
      this.router.navigate(['/register']); 
    }

  get f() { return this.loginForm.controls; }
}

