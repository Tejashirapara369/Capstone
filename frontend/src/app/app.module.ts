import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ToursComponent } from './pages/tours/tours.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ToursComponent,
    TourDetailComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule,
    NgbDatepickerModule,
    NgbRatingModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot(environment.stripeKey),
  ],
  providers: [
    provideClientHydration(),
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
