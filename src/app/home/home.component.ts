import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent { 
	rightArrow = faArrowRight;
	downArrow = faArrowDown;
	
	constructor(activatedRoute: ActivatedRoute, titleService: Title) {
		activatedRoute.data.subscribe((data) => titleService.setTitle(data['title']));
	}
}
