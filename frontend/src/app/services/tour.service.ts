import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginPayload, RegisterPayload } from '../models/authentication.model';
import { Observable } from 'rxjs/internal/Observable';

const ENVIRONMENT_URL = environment.baseUrl + '/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getTopFeaturedTour(): Observable<any> {
    return this.http.get(`${ENVIRONMENT_URL}/top-tour`);
  }

  getAllTours(): Observable<any> {
    return this.http.get(`${ENVIRONMENT_URL}`);
  }

  getTourBySlug(slug: string): Observable<any> {
    return this.http.get(`${ENVIRONMENT_URL}/${slug}`);
  }
}
