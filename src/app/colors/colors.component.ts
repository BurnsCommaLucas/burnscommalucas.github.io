import { Component, OnInit } from '@angular/core';
import { ColorScheme } from './ColorScheme';
import { DefaultColors } from './DefaultColors';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-colors',
	templateUrl: './colors.component.html'
})
export class ColorsComponent implements OnInit {
	accentLight = '#ffffff88';
	accentDark = '#00000088';
	currentScheme = undefined;
	currentPrimary = '#3866af';
	currentSecondary = '#ffebb5';
	glowEnabled = false;
	colorSchemes: ColorScheme[] = DefaultColors;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, titleService: Title) {
		activatedRoute.data.subscribe((data) => titleService.setTitle(data['title']));
	}

	ngOnInit() {
		const queryParams = this.router.lastSuccessfulNavigation.extractedUrl.queryParamMap;

		const schemeName = queryParams.get('scheme');
		const primary = queryParams.get('primary');
		const secondary = queryParams.get('secondary');
		const glow = queryParams.get('glow');

		// Start with a base of the schema
		if (schemeName) {
			const scheme = this.colorSchemes.find(item => {
				return item.name == schemeName;
			});
			this.schemeChanged(scheme);
		}

		// And then layer on top of the scheme any selected individual colors
		primary ? this.primaryChanged(primary) : {};
		secondary ? this.secondaryChanged(secondary) : {};
		glow ? this.setGlow(!!glow) : {};
	}

	updateQueryParams(key: 'scheme' | 'primary' | 'secondary' | 'glow', value: string | boolean) {
		const queryParamMap = {};
		queryParamMap[key] = value;
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: queryParamMap,
			queryParamsHandling: "merge",
		});
	}

	schemeChanged(scheme: ColorScheme) {
		this.primaryChanged(scheme.primary);
		this.secondaryChanged(scheme.secondary);
		this.setGlow(scheme.glow);
		localStorage.setItem('scheme', scheme.name);
		this.updateQueryParams('scheme', scheme.name);
	}

	needsLightAccent(hexColor: string) {
		const hex = hexColor.replace(/^#/, '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return 123 > (r * 299 + g * 587 + b * 114) / 1000;
	}

	/*
	Control the primary (background) color
	*/
	primaryChanged(val: string) {
		this.currentPrimary = val;
		document.documentElement.style.setProperty('--accent', this.needsLightAccent(val) ? this.accentLight : this.accentDark);
		document.documentElement.style.setProperty('--primary', val);

		localStorage.setItem('primary', val);
		this.updateQueryParams('primary', val);
	}

	/*
	Control the secondary (text) color
	*/
	secondaryChanged(val: string) {
		this.currentSecondary = val;
		document.documentElement.style.setProperty('--secondary', val);
		localStorage.setItem('secondary', val);

		// Restart the blink animation if there are any curosrs blinking,
		// the color in the animation doesn't like to update
		const elements = [].slice.call(document.getElementsByClassName('blink'));
		elements.forEach(element => {
			element.classList.remove('blink');
			void element.offsetWidth;
			element.classList.add('blink');
		});
		this.setGlow(this.glowEnabled);
		this.updateQueryParams('secondary', val);
	}

	/*
	Control the 'glow' toggle
	*/
	setGlow(val: boolean) {
		this.glowEnabled = val;
		const glowColor = this.currentSecondary + (this.glowEnabled ? 'ff' : '00');
		document.documentElement.style.setProperty('--glow', glowColor);

		localStorage.setItem('glow', this.glowEnabled.toString());
		this.updateQueryParams('glow', val);
	}
}
