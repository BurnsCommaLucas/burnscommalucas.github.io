import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScheme } from './ColorScheme';
import { DefaultColorsMap } from './DefaultColors';
import { stripUnsafeCharacters } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class ColorsService {
	accentLight = '#ffffff88';
	accentDark = '#00000088';
	currentScheme: ColorScheme = undefined;
	currentPrimary = '';
	currentSecondary = '';
	currentBright = '';
	currentDark = '';
	glowEnabled = false;
	colorSchemesMap: Map<string, ColorScheme> = DefaultColorsMap;

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		// TODO all this *alllllmost* works, needs a bit more help in un-setting the query params
		// 	when the user re-selects a theme
		activatedRoute.queryParamMap.subscribe((queryParams) => {
			const schemeName = queryParams.get('scheme');
			const primary = queryParams.get('primary');
			const secondary = queryParams.get('secondary');
			const glow = queryParams.get('glow');

			// Start with a base of the schema
			if (schemeName) {
				const scheme = this.colorSchemesMap.get(stripUnsafeCharacters(schemeName));
				scheme ? this.schemeChanged(scheme) : {};
			}

			// And then layer on top of the scheme any selected individual colors
			primary ? this.primaryChanged(this.withLeadingHash(primary)) : {};
			secondary ? this.secondaryChanged(this.withLeadingHash(secondary)) : {};
			glow ? this.setGlow(!!glow) : {};
		});

		this.setBrightAndDarkColors();
	}

	/**
	 * https://stackoverflow.com/a/9733420
	 */
	private luminance(colorString: string) {
		const c = this.decomposeColor(colorString);
		const a = c.map((v) => {
			v /= 255;
			return v <= 0.03928
				? v / 12.92
				: Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	}

	private decomposeColor(hexColor: string): [number, number, number] {
		const hex = hexColor.replace(/^#/, '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return [r, g, b];
	}

	private setBrightAndDarkColors() {
		const lumPrimary = this.luminance(this.currentPrimary);
		const lumSecondary = this.luminance(this.currentSecondary);

		if (lumPrimary > lumSecondary) {
			this.currentBright = this.currentPrimary;
			this.currentDark = this.currentSecondary;
		} else {
			this.currentDark = this.currentPrimary;
			this.currentBright = this.currentSecondary;
		}

		document.documentElement.style.setProperty('--bright', this.currentBright);
		document.documentElement.style.setProperty('--dark', this.currentDark);
	}

	// TODO Need to fix lifecycle of query params to get this all to play nice
	// updateQueryParams(params: {}, purge: boolean = false) {
	// 	this.router.navigate([], {
	// 		relativeTo: this.activatedRoute,
	// 		queryParams: params,
	// 		queryParamsHandling: purge ? '' : 'merge',
	// 	});
	// }

	schemeChanged(scheme: ColorScheme) {
		this.currentScheme = scheme;
		this.primaryChanged(scheme.primary);
		this.secondaryChanged(scheme.secondary);
		this.setGlow(scheme.glow);

		localStorage.setItem('scheme', scheme.urlSafeName());

		this.setBrightAndDarkColors();
	}

	needsLightAccent(hexColor: string) {
		const c = this.decomposeColor(hexColor);
		return 123 > (c[0] * 299 + c[1] * 587 + c[1] * 114) / 1000;
	}

	/*
	Control the primary (background) color
	*/
	primaryChanged(val: string) {
		this.currentPrimary = val;
		document.documentElement.style.setProperty('--accent', this.needsLightAccent(val) ? this.accentLight : this.accentDark);
		document.documentElement.style.setProperty('--primary', val);

		localStorage.setItem('primary', val);

		this.setBrightAndDarkColors();
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

		this.setBrightAndDarkColors();
	}

	/*
	Control the 'glow' toggle
	*/
	setGlow(val: boolean) {
		this.glowEnabled = val;
		const glowColor = this.currentSecondary + (this.glowEnabled ? 'ff' : '00');
		document.documentElement.style.setProperty('--glow', glowColor);

		localStorage.setItem('glow', this.glowEnabled.toString());
	}

	private withLeadingHash(input: string): string {
		return input.startsWith("#") ? input : `#${input}`
	}

	// private withoutLeadingHash(input: string): string {
	// 	return input.replace(/^#/, '');
	// }
}
