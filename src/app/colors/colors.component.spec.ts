import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsComponent } from './colors.component';

describe('AboutComponent', () => {
	let component: ColorsComponent;
	let fixture: ComponentFixture<ColorsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ColorsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ColorsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
