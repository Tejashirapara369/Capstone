import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { COMPANY_NAME } from '../../constant/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private title: Title) {
    title.setTitle(COMPANY_NAME + ': Home');
  }
}
