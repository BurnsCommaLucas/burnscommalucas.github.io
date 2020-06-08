import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faTwitch, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
  linkedin = faLinkedin;
  github = faGithubSquare;
  twitch = faTwitch;
  palette = faPalette;
  primary = '#3866af';
  secondary = '#ffebb5';
  accentLight = 'rgba(255, 255, 255, 0.2)';
  accentDark = 'rgba(0, 0, 0, 0.2)';

  constructor(private router: Router) {}

  primaryChanged(val: string) {
    document.documentElement.style.setProperty('--accent', this.needsLightAccent(val) ? this.accentLight : this.accentDark);
    document.documentElement.style.setProperty('--primary', val);
  }

  secondaryChanged(val: string) {
    document.documentElement.style.setProperty('--secondary', val);
    // Restart the blink animation if there are any curosrs blinking,
    // the color in the animation doesn't like to update
    const elements = [].slice.call(document.getElementsByClassName('blink'));
    elements.forEach(element => {
      element.classList.remove('blink');
      void element.offsetWidth; // tslint:disable-line
      element.classList.add('blink');
    });
  }

  needsLightAccent(hexColor: string) {
    const hex = hexColor.replace(/^#/, '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return 123 > (r * 299 + g * 587 + b * 114) / 1000;
  }
}
