import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tours.model';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {

  tourDetails: Tour = new Tour();
  selectedDate?: string;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.getTourDetail();
  }

  getTourDetail(): void {
    const slugUrl = this.route.snapshot.params['slug'];
    this.tourService.getTourBySlug(slugUrl).subscribe((resp) => {
      this.tourDetails = resp?.tour;
      console.log('this.tourDetails', this.tourDetails);
    });
  }
}
