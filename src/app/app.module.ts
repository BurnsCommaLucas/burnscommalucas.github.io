import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from './routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarkdownModule, MARKED_OPTIONS, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { POST_LOCATION_PREFIX } from './app-constants';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ColorsComponent } from './colors/colors.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import markedFootnote from 'marked-footnote';
import { stripUnsafeCharacters } from './helpers';
import { LocationStrategy } from '@angular/common';
import { PathPreserveQueryLocationStrategy } from './preserve-query-params';

@NgModule({ declarations: [
        AppComponent,
        AboutComponent,
        ColorsComponent,
        HomeComponent,
        ResumeComponent,
        BlogComponent,
        PostComponent,
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent], 
    imports: [
        BrowserModule,
        NgbNavModule,
        NgbCollapseModule,
        FontAwesomeModule,
        FormsModule,
        ColorPickerModule,
        MarkdownModule.forRoot({
            markedOptions: {
                provide: MARKED_OPTIONS,
                useFactory: markedOptionsFactory
            },
            markedExtensions: [
                markedFootnote()
            ]
        }),
        RouterModule.forRoot(appRoutes, {
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
            scrollPositionRestoration: 'enabled'
        })], providers: [
        { provide: LocationStrategy, useClass: PathPreserveQueryLocationStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

export function markedOptionsFactory(): MarkedOptions {
	const renderer = new MarkedRenderer();

	const wrapIfBold = (level: number, content: string) => {
		return level % 2 == 0 ? `<b>${content}</b>` : content;
	}

	renderer.heading = (text: string, level: number) => {
		const id = stripUnsafeCharacters(text);
		// Encode every heading with a link to itself within the post
		const linkBody = `<a href="#${id}" id="${id}">${text}</a>`;
		return `<h${level}>${wrapIfBold(level, linkBody)}</h${level}>`;
	};

	renderer.link = (href: string | null, title: string | null, text: string) => {
		return `<a href="${href}" target="_blank">${text}</a>`;
	};

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