import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from './routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { httpInterceptorProviders } from './http-interceptors';
import { EnsureHttpInterceptor } from './http-interceptors/ensure-https-interceptor';

@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: EnsureHttpInterceptor, multi: true }],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    ColorPickerModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
