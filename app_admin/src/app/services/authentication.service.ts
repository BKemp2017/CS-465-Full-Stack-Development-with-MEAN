import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_BASE_URL = 'http://localhost:3000/api';

  // BehaviorSubjects to keep track of user and token
  public userSubject = new BehaviorSubject<User | null>(null);
  public tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Initialize userSubject and tokenSubject with values from localStorage if available
    this.userSubject.next(this.parseStoredUser());
    this.tokenSubject.next(this.parseStoredToken());
  }

  // Method to parse and return user from localStorage with fallback to null
  private parseStoredUser(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Method to parse and return token from localStorage with fallback to null
  private parseStoredToken(): string | null {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  }

  // Method to handle user login
  public login(credentials: User): Observable<AuthResponse> {
    const obs = new AsyncSubject<AuthResponse>();
    this.http.post<AuthResponse>(`${this.API_BASE_URL}/login`, credentials)
      .subscribe({
        next: resp => {
          // Update user and token upon successful login
          this.userSubject.next(credentials);
          this.tokenSubject.next(resp.token);
          obs.next(resp);
          obs.complete();
        },
        error: e => obs.error(e)
      });
    return obs;
  }

  // Method to handle user registration
  public register(credentials: { name: string; email: string; password: string }): Observable<AuthResponse> {
    console.log("Sending registration request to server:", credentials); // Log the credentials being sent
    const obs = new AsyncSubject<AuthResponse>();
  
    this.http.post<AuthResponse>(`${this.API_BASE_URL}/register`, credentials).subscribe({
      next: resp => {
        // Update user and token upon successful registration
        this.userSubject.next({ name: credentials.name, email: credentials.email });
        this.tokenSubject.next(resp.token);
        obs.next(resp);
        obs.complete();
      },
      error: e => obs.error(e)
    });
  
    return obs;
  }
  

  // Method to handle user logout
  public logout() {
    // Clear user and token upon logout
    this.userSubject.next(null);
    this.tokenSubject.next(null);
  }

  // Method to check if the user is logged in
  public isLoggedIn(): boolean {
    // User is considered logged in if token is present
    return this.tokenSubject.getValue() !== null;
  }
}

