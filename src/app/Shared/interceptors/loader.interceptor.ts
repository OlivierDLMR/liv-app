import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

/*
  Dans notre interceptor, à l'aide de la méthode loaederService.setLoader() :
  On set loaderService.isLoading$ à TRUE quand la requête démarre
  On set loaderService.isLoading$  à FALSE quand la réponse arrive

  Maintenant dans app.component HTML,
  nous pouvons afficher le composant <mat-progressbar> SI loaderService.isLoading$ vaut TRUE

  Objectif: un loaeder s'affichera automatiquement sur chaque request sortante
  */

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
