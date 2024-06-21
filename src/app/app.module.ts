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
import { PostComponent } from './post/post.component';

@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		ColorsComponent,
		HomeComponent,
		ResumeComponent,
		BlogComponent,
		PostComponent
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
export class AppModule { }

export function markedOptionsFactory(): MarkedOptions {
	const renderer = new MarkedRenderer();

	renderer.image = (href: string | null, title: string | null, text: string) => {
		if (href == null) return null

		let interpretedUrl = href;

		if (!href.startsWith("http://") && !href.startsWith("https://")) {
			interpretedUrl = `${POST_LOCATION_PREFIX}/images/${interpretedUrl}`;
		}

		return `<div class='postImage'><img src=${interpretedUrl} alt="${text ? text : 'No alt text provided'}"></img></div>`;
	};

	return {
		// https://github.com/jfcere/ngx-markdown/blob/master/lib/src/marked-options.ts
		renderer: renderer,
		gfm: true
	};
}