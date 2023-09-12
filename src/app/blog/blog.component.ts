import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { POST_LOCATION_PREFIX } from '../app-constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements AfterContentInit {
  private httpClient: HttpClient;
  private router: Router;

  postFileNames: string[];

  constructor(http: HttpClient, router: Router) {
    this.httpClient = http;
    this.router = router;
    
    this.httpClient
      .get(`${POST_LOCATION_PREFIX}/postIndex.json`, { responseType: 'json' })
      .subscribe(data => {
        this.postFileNames = data['postFiles'].map((filePath: string) => `${POST_LOCATION_PREFIX}/${filePath}`);
      });
  }

  ngAfterContentInit(): void {
    let element = null;
    const fragment = this.safeEncodeParam(this.router.lastSuccessfulNavigation.extractedUrl.fragment);
    // Compensate for lag from loading things like images, or a preposterous number of posts
    setTimeout(() => {
      element = document.getElementById(fragment);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  safeEncodeParam(param: string): string {
    if (decodeURIComponent(param) == param) return encodeURIComponent(param);
    else return param
  }
}
