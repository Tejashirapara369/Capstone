import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tours.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit {

  readonly imgUrl: string = environment.baseUrl + 'assets/tour-images/';

  tours: Tour[] = [];

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.getAllTours();
  }

  getAllTours(): void {
    this.tourService.getAllTours().subscribe(resp => {
      this.tours = resp.data?.data;
    });
  }
}
