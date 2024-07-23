import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReviewPayload } from '../models/review.model';

const ENVIRONMENT_URL = environment.baseUrl + 'api/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  postFeedback(tourId: string, payload: ReviewPayload) {
    const authToken = localStorage.getItem('authToken');
    return this.http.post(`${ENVIRONMENT_URL}/${tourId}`, payload, { headers: { Authorization: `Bearer ${authToken}` } });
  }

  getAll() {
    const authToken = localStorage.getItem('authToken');

    return this.http.get(ENVIRONMENT_URL, { headers: { Authorization: `Bearer ${authToken}` } });
  }
}
