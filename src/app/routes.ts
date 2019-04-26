import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';

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
        path: 'contact',
        component: ContactComponent,
        data: { title: 'Contact'}
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
    }
];
