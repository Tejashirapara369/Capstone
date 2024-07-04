import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { COMPANY_NAME } from '../../constant/common';
import { TourService } from '../../services/tour.service';
import { TourShortInfo } from '../../models/tours.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  heroImages = [
    {
      title: "Majestic Banff",
      tagline: "Discover nature's beauty in the heart of the Rockies.",
      url: "banff"
    },
    {
      title: "Vibrant Vancouver",
      tagline: "Experience the perfect blend of urban life and stunning landscapes.",
      url: "vancouver"
    },
    {
      title: "Dynamic Toronto",
      tagline: "Dive into the diverse culture and bustling city life.",
      url: "toronto"
    },
    {
      title: "Magical Mexico",
      tagline: "Embrace rich heritage, vibrant festivals, and stunning beaches.",
      url: "mexico"
    },
    {
      title: "Aurora Magic",
      tagline: "Witness the breathtaking dance of the Northern Lights in pristine skies.",
      url: "northern_light"
    },
  ];

  activities: string[] = ['camping', 'hiking', 'cycling', 'kayaking', 'scuba', 'paragliding'];

  topTours: TourShortInfo[] = [];

  constructor(private title: Title, private tourService: TourService) {
    title.setTitle(COMPANY_NAME + ': Home');
  }


  ngOnInit(): void {
    this.getTopFeaturedTours();
  }

  getTopFeaturedTours(): void {
    this.tourService.getTopFeaturedTour().subscribe(resp => {
      this.topTours = resp.data?.data;
      this.topTours.length = 3;
      console.log('this.topTours', this.topTours);
    });
  }

}
