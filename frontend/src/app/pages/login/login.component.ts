import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { COMPANY_NAME } from '../../constant/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../../models/authentication.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });


  constructor(
    private title: Title,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    title.setTitle(COMPANY_NAME + ': Login');
  }

  login(): void {
    this.authenticationService.login(this.loginForm.value).subscribe((resp: AuthResponse) => {
      localStorage.setItem("authToken", resp.token);
      this.router.navigate(['/']);
    });
  }
}
