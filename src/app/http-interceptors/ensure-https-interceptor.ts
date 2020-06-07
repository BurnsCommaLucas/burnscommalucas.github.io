import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EnsureHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // clone request and replace 'http://' with 'https://' at the same time
        const secureReq = req.clone({
            url: req.url.substr(0,4) === 'http' ? req.url.replace('http://', 'https://') : 'http://' + req.url
        });
        // send the cloned, "secure" request to the next handler.
        return next.handle(secureReq);
    }
}