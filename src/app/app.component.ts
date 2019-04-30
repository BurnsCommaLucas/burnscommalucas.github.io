import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faPalette } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isNavbarCollapsed = true;
  hidePicker = true;
  title = 'personal-site';
  bars = faBars;
  palette = faPalette;
  primary = '#3866af';
  secondary = '#ffebb5';

  constructor(private router: Router) {}

  primaryChanged(val: string) {
    document.documentElement.style.setProperty('--primary', val);
  }

  secondaryChanged(val: string) {
    document.documentElement.style.setProperty('--secondary', val);
  }
}
