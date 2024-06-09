import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { COMPANY_NAME } from '../../constant/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private title: Title) {
    title.setTitle(COMPANY_NAME + ': Login');
  }
}
