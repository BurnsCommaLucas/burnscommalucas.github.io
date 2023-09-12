import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from './routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { POST_LOCATION_PREFIX } from './app-constants';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ColorsComponent } from './colors/colors.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		ColorsComponent,
		HomeComponent,
		ResumeComponent,
		BlogComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		NgbModule,
		FontAwesomeModule,
		FormsModule,
		ColorPickerModule,
		MarkdownModule.forRoot({
			markedOptions: {
				provide: MarkedOptions,
				useFactory: markedOptionsFactory
			}
		}),
		RouterModule.forRoot(appRoutes, {})
	],
	bootstrap: [AppComponent],
	exports: [AppComponent]
})
export class AppModule {}

export function markedOptionsFactory(): MarkedOptions {
	const renderer = new MarkedRenderer();

	renderer.heading = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6, raw: string) => {
		const id = encodeURIComponent(text);
		return `<h${level}><a href='posts#${id}' id='${id}'>${text}</a></h${level}>`;
	};

	renderer.image = (href: string | null, title: string | null, text: string) => {
		return `<div class='postImage'><img src=${POST_LOCATION_PREFIX}/${href} alt="${text ? text : ''}"></img></div>`;
	};

	return {
		// https://github.com/jfcere/ngx-markdown/blob/master/lib/src/marked-options.ts
		// gfm: true,
		renderer: renderer
	};
}