import { Component, OnInit } from '@angular/core';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-colors',
	templateUrl: './colors.component.html'
})
export class ColorsComponent implements OnInit {
	ngOnInit(): void {
		this.currentPrimary = localStorage.getItem('primary');
		this.currentSecondary = localStorage.getItem('secondary');
		this.glowEnabled = localStorage.getItem('glow') === 'true';
	}
	accentLight = '#ffffff88';
	accentDark = '#00000088';
	currentPrimary = '#3866af';
	currentSecondary = '#ffebb5';
	glowEnabled = false;

	defaultSchemes: ColorScheme[] = [
		{
			name: 'Default',
			primary: '#3866af',
			secondary: '#ffebb5',
			glow: false
		},
		{
			name: 'Solarized Dark',
			primary: '#073642',
			secondary: '#93a1a1',
			glow: false
		},
		{
			name: 'Solarized Light',
			primary: '#eee8d5',
			secondary: '#586e75',
			glow: false
		},
		{
			name: 'Amber CRT',
			primary: '#2a2c2a',
			secondary: '#ff7300',
			glow: true
		},
		{
			name: 'Green CRT',
			primary: '#2a2c2a',
			secondary: '#03ff05',
			glow: true
		},
		{
			name: 'Hot Dog Stand',
			primary: '#fdfc00',
			secondary: '#ff0000',
			glow: false
		}
	];

	pickerPrimary(val: string) {
		document.documentElement.style.setProperty('--accent', this.needsLightAccent(val) ? this.accentLight : this.accentDark);
		document.documentElement.style.setProperty('--primary', val);

		localStorage.setItem('primary', val);
	}

	primaryChanged(val: string) {
		this.currentPrimary = val;
		this.pickerPrimary(val);
	}

	pickerSecondary(val: string) {
		document.documentElement.style.setProperty('--secondary', val);
		localStorage.setItem('secondary', val);

		// Restart the blink animation if there are any curosrs blinking,
		// the color in the animation doesn't like to update
		const elements = [].slice.call(document.getElementsByClassName('blink'));
		elements.forEach(element => {
			element.classList.remove('blink');
			void element.offsetWidth; // tslint:disable-line
			element.classList.add('blink');
		});
		this.glowChanged();
	}

	secondaryChanged(val: string) {
		this.currentSecondary = val;
		this.pickerSecondary(val);
	}

	needsLightAccent(hexColor: string) {
		const hex = hexColor.replace(/^#/, '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return 123 > (r * 299 + g * 587 + b * 114) / 1000;
	}

	glowChanged() {
		const glowColor = this.currentSecondary + (this.glowEnabled ? 'ff' : '00');
		document.documentElement.style.setProperty('--glow', glowColor);

		localStorage.setItem('glow', this.glowEnabled.toString());
	}

	setGlow(val: boolean) {
		this.glowEnabled = val;
		this.glowChanged();
	}
}

class ColorScheme {
	name: string;
	primary: string;
	secondary: string;
	glow: boolean;
}