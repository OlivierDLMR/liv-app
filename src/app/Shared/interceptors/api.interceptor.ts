import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  cloneReq: HttpRequest<unknown>;

  urlBackEnd:string="http://localhost:8080/liv/utilisateurs";

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("==> api.interceptor - intercept() ");
    console.log("     request : " , request);
    if (request.url.includes(this.urlBackEnd)) {
      if (request.url.includes("/auth/local")) {
        this.cloneReq = request;
      }
      else {
        // this.cloneReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')) });
        this.cloneReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' ) }); 
      }
    }
    return next.handle(this.cloneReq);
  }
}
