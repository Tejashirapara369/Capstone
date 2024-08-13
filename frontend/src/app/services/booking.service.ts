import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ENVIRONMENT_URL = environment.baseUrl + 'api/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  stripePromise: Promise<Stripe>;

  constructor(private http: HttpClient) {
    this.stripePromise = this.loadStripe();
  }

  private async loadStripe(): Promise<Stripe> {
    return await loadStripe(environment.stripeKey) || new Promise(() => { });
  }

  async redirectToCheckout(slug: string) {
    const stripe = await this.stripePromise;
    this.getStripeSession(slug)
      .subscribe(async (resp: any) => {
        const result = await stripe.redirectToCheckout({
          sessionId: resp.session.id
        });
      });
  }

  getStripeSession(slug: string): Observable<any> {
    return this.http.get(`${ENVIRONMENT_URL}/checkout/${slug}`);
  }

  getMyBookings(): Observable<any> {
    return this.http.get(`${ENVIRONMENT_URL}/my-bookings`);
  }

  confirmBooking(tour: string, price: number): Observable<any> {
    return this.http.post(`${ENVIRONMENT_URL}`, { tour, price });
  }
}
