import { AfterContentInit, Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDefiniton, PostIndex } from '../PostIndex';
import { BsMarkdownAnchorService } from '../markdown-anchor.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements AfterContentInit {
  post: PostDefiniton

  constructor(activatedRoute: ActivatedRoute, titleService: Title, private router: Router, private anchorService: BsMarkdownAnchorService) {
    const selectedPostTitle = activatedRoute.snapshot.params['postTitle'];
    const decodedPostTitle = decodeURIComponent(selectedPostTitle);
    this.post = PostIndex.get(decodedPostTitle);

    activatedRoute.data.subscribe((data: PostDefiniton) => {
      titleService.setTitle(`${data.title} ${this.post.title}`);
    });
  }

  @HostListener("click", ["$event"])
  onDocumentClick(event: Event) {
    // intercept click events to make href routing work in these dynamically rendered markdown pages
    this.anchorService.interceptClick(event, (fragment) => this.delayedScrollTo(fragment, 0));
  }

  ngAfterContentInit(): void {
    this.delayedScrollTo(this.router.lastSuccessfulNavigation.extractedUrl.fragment, 250);
  }

  private delayedScrollTo(anchor: string, delay: number) {
    let element = null;

    const stopAllHighlights = () => {
      const elements = [].slice.call(document.getElementsByClassName('highlight'));
      elements.forEach(element => {
        element.classList.remove('highlight');
        void element.offsetWidth;
      });
    };

    const highlightElement = (element: HTMLElement) => {
      element.classList.add("highlight");

      setTimeout(() => {
        element.classList.remove("highlight");
      }, 2400);
    };

    // Compensate for lag from loading things like images
    anchor ? setTimeout(() => {
      // Try to scroll the requested frament into view
      element = document.getElementById(this.scrapeAnchorId(anchor));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // stop all highlight animations
        stopAllHighlights();
        // add the highlihg animation to show the user what item they should look at
        highlightElement(element)
      }
    }, delay) : {};
  }

  private scrapeAnchorId(param: string): string {
    let decoded = param;

    if (decoded[0] == "#") decoded = decoded.substring(1);

    return decoded;
  }
}
