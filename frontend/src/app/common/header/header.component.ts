import { Component, OnDestroy, OnInit } from '@angular/core';
import { COMPANY_NAME, MENU } from '../../constant/common';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  readonly COMPANY_NAME = COMPANY_NAME;
  readonly MENU = MENU;

  isLoggedIn = false;

  subscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authService.isLoggedIn.next(false);
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
