import { Component } from '@angular/core';
import { COMPANY_NAME, MENU } from '../../constant/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly COMPANY_NAME = COMPANY_NAME;
  readonly MENU = MENU;
}
