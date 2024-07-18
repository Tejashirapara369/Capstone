import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ENVIRONMENT_URL = environment.baseUrl + '/booking';

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
    const authToken = localStorage.getItem('authToken');

    this.getStripeSession(slug)
      .subscribe(async (resp: any) => {
        const result = await stripe.redirectToCheckout({
          sessionId: resp.session.id
        });
      });
  }

  getStripeSession(slug: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    return this.http.get(`${ENVIRONMENT_URL}/checkout/${slug}`, { headers: { Authorization: `Bearer ${authToken}` } });
  }
}
