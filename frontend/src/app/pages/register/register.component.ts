import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { COMPANY_NAME } from '../../constant/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '../../models/authentication.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  readonly UserRole = UserRole;

  registerForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    roles: [UserRole.user],
    password: [null, Validators.required],
    passwordConfirm: [null, Validators.required],
  });

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    title.setTitle(COMPANY_NAME + ': Signup');
  }

  register(): void {
    this.authenticationService.register(this.registerForm.value).subscribe(resp => {
      localStorage.setItem("authToken", resp.token);
      this.router.navigate(['/']);
    });
  }
}
