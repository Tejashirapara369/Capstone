import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { authGuard } from './guard/auth.guard';
import { BookingConfirmedComponent } from './pages/booking-confirmed/booking-confirmed.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'tours',
    children: [
      {
        path: '',
        component: ToursComponent,
      },
      {
        path: ':slug',
        children: [
          {
            path: '',
            component: TourDetailComponent,
          },
          {
            path: 'checkout',
            component: CheckoutComponent,
          }
        ]
      },
    ]
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [authGuard]
  },
  {
    path: 'booking-confirmed/:tour/:price',
    component: BookingConfirmedComponent,
    canActivate: [authGuard]
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
