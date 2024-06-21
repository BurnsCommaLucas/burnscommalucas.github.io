import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PostDefiniton, PostList } from '../PostIndex';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  allPosts: PostDefiniton[];
  currentPost = undefined;

  constructor(activatedRoute: ActivatedRoute, titleService: Title) {
    activatedRoute.data.subscribe((data) => {
      titleService.setTitle(data['title']);
    });

    this.allPosts = PostList;
  }

  hasPosts() {
    return this.allPosts.length != 0
  }
}