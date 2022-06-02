import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from './routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ColorsComponent } from './colors/colors.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		ColorsComponent,
		HomeComponent,
		ResumeComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		NgbModule,
		FontAwesomeModule,
		FormsModule,
		ColorPickerModule,
		RouterModule.forRoot(appRoutes)
	],
	bootstrap: [AppComponent],
	exports: [AppComponent]
})
export class AppModule { }
