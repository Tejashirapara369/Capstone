import { Component } from '@angular/core';
import { MENU } from '../../constant/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  readonly MENU = MENU;
}
