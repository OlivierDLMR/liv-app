import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  cloneReq: HttpRequest<unknown>;

  urlBackEnd: string = environment.BE_API_URL + '/liv';

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // =================> gestiion de l'url du backend <==================

    if (request.url.includes(this.urlBackEnd)) {
      if (request.url.includes('/authenticate') || request.url.includes('/utilisateurs/create')) {
        this.cloneReq = request;
      } else {
        // this.cloneReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')) });
        this.cloneReq = request.clone({headers: request.headers.set('Authorization', ' Bearer '  + localStorage.getItem('token'))});
      }
      return next.handle(this.cloneReq);
    }

    // =================> gestiion des urls autres que backend <==================
    return next.handle(request);
  }
}
