import { Component, OnInit, ViewChild } from '@angular/core';
import { injectStripe, StripeCardComponent, StripeCardNumberComponent, StripeFactoryService, StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { loadStripe, StripeCardElementOptions, StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tours.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  stripe = injectStripe(environment.stripeKey);

  tourDetails: Tour = new Tour();

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };


  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private tourService: TourService,
    private stripeFactoryService: StripeFactoryService
  ) {
    // this.stripe = stripeFactoryService.create(environment.stripeKey);
  }

  ngOnInit(): void {
    this.getTourDetail();
  }

  getTourDetail(): void {
    const slugUrl = this.route.snapshot.params['slug'];
    this.tourService.getTourBySlug(slugUrl).subscribe((resp) => {
      this.tourDetails = resp?.tour;
    });
  }

  pay() {
    const tourSlug = this.route.snapshot.params['slug'];
    this.bookingService.getStripeSession(tourSlug).subscribe((resp) => {
      // this.stripe = resp.session;
      this.stripeService.confirmCardPayment(resp.session.client_secret, {
        payment_method: {
          card: this.card.element,
        },
      }).subscribe({
        next: (resp) => {
          console.log('resp', resp);
          this.router.navigate(['myBookings'], { relativeTo: this.route });
        },
        error: (error) => {
          console.log('error', error);
        }

      });
    })
  }
}
