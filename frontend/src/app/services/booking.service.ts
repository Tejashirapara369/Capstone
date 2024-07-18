import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const ENVIRONMENT_URL = environment.baseUrl + '/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getStripeSession(slug: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    return this.http.get(`${ENVIRONMENT_URL}/checkout/${slug}`, {headers: {Authorization : `Bearer ${authToken}`}});
  }
}
