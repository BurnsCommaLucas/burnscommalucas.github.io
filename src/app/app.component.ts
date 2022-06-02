import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faTwitch, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isNavbarCollapsed = true;
  hidePicker = true;
  title = 'personal-site';
  bars = faBars;
  linkedin = faLinkedin;
  github = faGithubSquare;
  twitch = faTwitch;
  palette = faPalette;

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('primary', '#3866af');
    localStorage.setItem('secondary', '#ffebb5');
    localStorage.setItem('glow', 'false');
  }
}