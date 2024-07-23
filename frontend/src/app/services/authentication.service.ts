import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginPayload, RegisterPayload } from '../models/authentication.model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

const ENVIRONMENT_URL = environment.baseUrl + 'api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const isLoggedIn = localStorage.getItem('authToken');
    this.isLoggedIn.next(Boolean(isLoggedIn));
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn.next(false);
    this.router.navigate(["/"]);
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${ENVIRONMENT_URL}/login`, payload).pipe(tap(resp => {
      this.isLoggedIn.next(true);
      localStorage.setItem("authToken", resp.token);
    }));
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${ENVIRONMENT_URL}/signup`, payload);
  }
}
