import { Component } from '@angular/core';
import { injectStripe, StripePaymentElementComponent } from 'ngx-stripe';
import { StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  stripeOptions: any;
  stripe = injectStripe(environment.stripeKey);

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    clientSecret: environment.stripeSecretKey,
    appearance: {
      theme: 'flat'
    }
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };
}
