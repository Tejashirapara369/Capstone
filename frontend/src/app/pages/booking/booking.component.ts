import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Tour } from '../../models/tours.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  myTours: Tour[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getAllMyBookings();
  }

  getAllMyBookings() {
    this.bookingService.getMyBookings().subscribe(resp => {
      console.log('resp', resp);
      this.myTours = resp.tours;
    });
  }
}
