import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-confirmed',
  templateUrl: './booking-confirmed.component.html',
  styleUrl: './booking-confirmed.component.scss'
})
export class BookingConfirmedComponent implements OnInit {
  tourId: string;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const { price, tour } = this.route.snapshot.params;
    if (tour && price) {
      this.confirmBooking(tour, price);
    }
  }

  confirmBooking(tour: string, price: number) {
    this.bookingService.confirmBooking(tour, price).subscribe(resp => {
      setTimeout(() => {
        this.router.navigate(['/booking']);
      }, 3000);
    });
  }
}
