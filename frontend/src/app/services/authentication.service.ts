import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginPayload, RegisterPayload } from '../models/authentication.model';
import { Observable } from 'rxjs/internal/Observable';

const ENVIRONMENT_URL = environment.baseUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${ENVIRONMENT_URL}/login`, payload);
  }
  
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${ENVIRONMENT_URL}/signup`, payload);
  }
}
