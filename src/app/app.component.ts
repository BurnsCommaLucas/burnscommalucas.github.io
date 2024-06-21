import { Component, OnInit } from '@angular/core';
import { faBars, faBook, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isNavbarCollapsed = true;
	title = 'personal-site';
	bars = faBars;
	linkedin = faLinkedin;
	github = faGithubSquare;
	book = faBook;
	palette = faPalette;

	constructor() { }

	ngOnInit(): void {
		localStorage.setItem('primary', '#3866af');
		localStorage.setItem('secondary', '#ffebb5');
		localStorage.setItem('glow', 'false');
	}
}
