import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-about',
	styleUrl: './about.component.css',
	templateUrl: './about.component.html'
})
export class AboutComponent {

	constructor(activatedRoute: ActivatedRoute, titleService: Title) {
		activatedRoute.data.subscribe((data) => titleService.setTitle(data['title']));
	}
}
