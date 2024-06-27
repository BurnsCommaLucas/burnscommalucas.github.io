import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ColorsComponent } from './colors/colors.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

export const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: { title: 'Lucas Burns - Home' }
	},
	{
		path: 'about',
		component: AboutComponent,
		data: { title: 'Lucas Burns - About' }
	},
	{
		path: 'home',
		redirectTo: ''
	},
	{
		path: 'resume',
		component: ResumeComponent,
		data: { title: 'Lucas Burns - Resume' }
	},
	{
		path: 'posts/:postTitle',
		pathMatch: 'prefix',
		component: PostComponent,
		data: { title: 'Lucas Burns - ' }
	},
	{
		path: 'posts',
		pathMatch: 'full',
		component: BlogComponent,
		data: { title: 'Lucas Burns - Posts' }
	},
	{
		path: 'colors',
		component: ColorsComponent,
		data: { title: 'Lucas Burns - Colors!' }
	},
	{
		path: '**',
		redirectTo: ''
	},
];
