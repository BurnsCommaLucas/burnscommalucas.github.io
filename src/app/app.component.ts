import { Component } from '@angular/core';
import { faBars, faBook, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { ColorsService } from './colors/colors.service';
import { DefaultColorsMap } from './colors/DefaultColors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	isNavbarCollapsed = true;
	title = 'personal-site';
	bars = faBars;
	linkedin = faLinkedin;
	github = faGithubSquare;
	book = faBook;
	palette = faPalette;
	defaultScheme = DefaultColorsMap.get("Default");

	constructor(colorsService: ColorsService) { 
		colorsService.schemeChanged(this.defaultScheme);
	}
}
