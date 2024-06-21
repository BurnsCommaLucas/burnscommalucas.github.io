import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent { 
	constructor(activatedRoute: ActivatedRoute, titleService: Title) {
		activatedRoute.data.subscribe((data) => titleService.setTitle(data['title']));
	}
}
