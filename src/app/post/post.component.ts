import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDefiniton, PostIndex } from '../PostIndex';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterContentInit {
  post: PostDefiniton

  constructor(activatedRoute: ActivatedRoute, titleService: Title, private markdownService: MarkdownService, private router: Router) {
    const selectedPostTitle = activatedRoute.snapshot.params['postTitle'];
    const decodedPostTitle = decodeURIComponent(selectedPostTitle);
    this.post = PostIndex.get(decodedPostTitle);

    activatedRoute.data.subscribe((data: PostDefiniton) => {
      titleService.setTitle(`${data.title} ${this.post.title}`);
    });
  }

  ngOnInit() {
    // Render headings here instead of `app.module.ts` because we need to know what post we're in to create the anchors properly
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const id = encodeURIComponent(text);
      const isBold = level % 2 == 0;
      // Encode every heading with a link to itself within the post
      // TODO something about the production build of this totally busts it for some reason, gotta figure that one out
      // const linkBody = `<a href="posts/${this.post.urlEncodedTitle()}#${id}" id="${id}">${text}</a>`;
      const linkBody = text;
      return `<h${level}>${isBold ? "<b>" : ""}${linkBody}${isBold ? "</b>" : ""}</h${level}>`;
    };
  }

  ngAfterContentInit(): void {
    let element = null;
    // Get the name of the requested anchor
    const fragment = this.safeEncodeParam(this.router.lastSuccessfulNavigation.extractedUrl.fragment);

    // Compensate for lag from loading things like images
    setTimeout(() => {
      // Try to scroll the requested frament into view
      element = document.getElementById(fragment);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  // If the param isn't already url encoded, return the encoded version
  private safeEncodeParam(param: string): string {
    if (decodeURIComponent(param) == param) return encodeURIComponent(param);
    else return param
  }
}
