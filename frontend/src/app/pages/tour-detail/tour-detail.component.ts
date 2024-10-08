import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tours.model';
import { BookingService } from '../../services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { environment } from '../../../environments/environment';
import { User } from '../../models/authentication.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {

  readonly imgUrl: string = environment.baseUrl + 'assets/tour-images/';
  loggedInUser: User;
  myReviewExist: boolean = true;

  tourDetails: Tour = new Tour();
  slugUrl: string;
  selectedDate?: string;
  reviewForm: FormGroup = this.fb.group({
    review: [null, Validators.required],
    rating: [0, [Validators.min(1), Validators.max(5)]]
  });
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loggedInUser = authService.loggedInUser?.data?.user;
  }

  ngOnInit(): void {
    this.slugUrl = this.route.snapshot.params['slug'];
    this.getTourDetail();
    this.getAllReviews();
  }

  getTourDetail(): void {
    this.tourService.getTourBySlug(this.slugUrl).subscribe((resp) => {
      this.tourDetails = resp?.tour;
    });
  }

  getAllReviews() {
    this.reviewService.getAll().subscribe((resp: any) => {
      this.reviews = resp.data.data.filter((review: Review) => review.tour === this.tourDetails.id);
      const myReviewIndex = this.reviews.findIndex(review => review.user._id === this.loggedInUser._id);
      this.myReviewExist = myReviewIndex > -1;
    });
  }

  checkout() {
    if (this.authService.isLoggedIn.getValue()) {
      this.bookingService.redirectToCheckout(this.slugUrl);
    } else {
      this.router.navigate(['/login']);
    }
  }

  postReview() {
    if (!this.tourDetails.id) return;
    this.reviewService.postFeedback(this.tourDetails.id, this.reviewForm.value).subscribe({
      next: (resp: any) => {
        this.reviews.push(resp.data.data);
        this.toastr.success("Review submitted successfully", "Success");
      },
      error: (error) => {
        this.toastr.error("Already Review Submitted");
      }
    });
  }
}
