import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorsService } from './colors.service';
import { ColorScheme } from './ColorScheme';
import { DefaultColorsMap } from './DefaultColors';

@Component({
	selector: 'app-colors',
	templateUrl: './colors.component.html'
})
export class ColorsComponent {
	colorSchemes: ColorScheme[] = [...DefaultColorsMap.values()];
	
	constructor(activatedRoute: ActivatedRoute, titleService: Title, public colorsService: ColorsService) {
		activatedRoute.data.subscribe((data) => titleService.setTitle(data['title']));
	}
}
