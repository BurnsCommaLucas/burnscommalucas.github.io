import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ColorsComponent } from './colors/colors.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { BlogComponent } from './blog/blog.component';

export const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { title: 'Home'}
	},
	{
		path: 'about',
		component: AboutComponent,
		data: { title: 'About'}
	},
	{
		path: 'home',
		component: HomeComponent,
		data: { title: 'Home'}
	},
	{
		path: 'resume',
		component: ResumeComponent,
		data: { title: 'Resume'}
	},
	{
		path: 'posts',
		component: BlogComponent,
		data: { title: 'Posts'}
	},
	{
		path: 'colors',
		component: ColorsComponent,
		data: { title: 'Colors!'}
	}
];
