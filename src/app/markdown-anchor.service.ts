import { HttpFeatureKind } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, UrlTree } from "@angular/router";

/**
 * https://github.com/jfcere/ngx-markdown/issues/125#issuecomment-805582082
 */
@Injectable({
    providedIn: "root",
})
export class BsMarkdownAnchorService {
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
    }

    isExternalUrl(href: string | null): boolean {
        return !href
            || href.startsWith("http:")
            || href.startsWith("https:")
            || href.startsWith("mailto:")
            || href.startsWith("tel:")
            || href.startsWith("/");
    }

    isFragment(href: string | null): boolean {
        return !href
            || href.startsWith("#");
    }

    stripQuery(url: string): string {
        return /[^?]*/.exec(url)[0];
    }

    stripFragmentAndQuery(url: string): string {
        return this.stripQuery(/[^#]*/.exec(url)[0]);
    }

    getUrlTree(url: string): UrlTree {
        const urlPath = this.safeDecodeParam(this.stripFragmentAndQuery(url) || this.stripFragmentAndQuery(this._router.url));
        const parsedUrl = this._router.parseUrl(url);
        const fragment = parsedUrl.fragment;
        const queryParams = parsedUrl.queryParams;
        return this._router.createUrlTree([urlPath], { relativeTo: this._route, fragment, queryParams });
    }

    navigate(url: string, replaceUrl = false) {
        const urlTree = this.getUrlTree(url);
        this._router.navigated = false;
        this._router.navigateByUrl(urlTree, { replaceUrl });
    }

    interceptClick(event: Event, onResolveFragment: (fragment: string) => void) {
        const element = event.target;
        if (!(element instanceof HTMLAnchorElement)) {
            return;
        }

        const href = element.getAttribute("href");
        if (this.isExternalUrl(href)) {
            return;
        }

        if (this.isFragment(href)) {
            this.navigate(href);
            onResolveFragment(href);
        } else {
            this.navigate(`/${href}`);
        }
        event.preventDefault();
    }

    // If the param isn't already url encoded, return the encoded version
    private safeDecodeParam(param: string): string {
        if (decodeURIComponent(param) == param) return param;
        else return decodeURIComponent(param)
    }
}