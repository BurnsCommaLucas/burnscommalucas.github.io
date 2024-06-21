import { Route } from "@angular/router";
import { POST_LOCATION_PREFIX } from "./app-constants";
import { PostComponent } from "./post/post.component";

export class PostDefiniton {
    constructor(
        public fileName: string,
        public title: string,
        public date: string
    ) { }

    urlEncodedTitle(): string {
        return encodeURIComponent(this.title);
    }

    toRoute(): Route {
        return {
            path: this.title,
            title: `Lucas Burns - ${this.title}`,
            data: this,
            component: PostComponent
        };
    }

    filePath(): string {
        return `${POST_LOCATION_PREFIX}/${this.fileName}`
    }
};

export const PostList = [
    new PostDefiniton("testPostPleaseIgnore.md", "Test Post, Please Don't Ignore", "2024-06-08")
].sort((a, b) => b.date.localeCompare(a.date));

export const PostIndex = new Map(PostList.map(post => [post.title, post]));