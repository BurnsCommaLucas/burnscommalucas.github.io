import { POST_LOCATION_PREFIX } from "./app-constants";
import { stripUnsafeCharacters } from "./helpers";

export class PostDefiniton {
    constructor(
        public fileName: string,
        public title: string,
        public date: string
    ) { }

    safeTitle(): string {
        return stripUnsafeCharacters(this.title);
    }

    filePath(): string {
        return `${POST_LOCATION_PREFIX}/${this.fileName}`
    }
};

export const PostList = [
    new PostDefiniton("testPostPleaseIgnore.md", "Test Post, Please Don't Ignore", "2024-06-08")
].sort((a, b) => b.date.localeCompare(a.date));

export const PostIndex = new Map(PostList.map(post => [post.safeTitle(), post]));