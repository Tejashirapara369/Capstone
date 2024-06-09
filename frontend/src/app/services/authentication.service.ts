import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginPayload, LoginResponse } from '../models/authentication.model';
import { Observable } from 'rxjs/internal/Observable';

const ENVIRONMENT_URL = environment.baseUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${ENVIRONMENT_URL}/login`, payload);
  }
}
