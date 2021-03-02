import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  urlBackEnd: string = environment.BE_API_URL + '/liv';
  cloneRequest: HttpRequest<unknown>;

  constructor(private alertService: AlertService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(" ==> errors.interceptor.ts - intercept()");
    console.log("     request : ", request);
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log('error is intercepted');
          console.error(err.status);
          switch (err.status) {
            case 400:
              this.alertService.show('Mauvaise requête. Réessayez.');
              break;
            case 401:
              this.alertService.show('Vous devez vous authentifier');
              this.router.navigate(['/login']);
              break;
            case 403:
              this.alertService.show('Ressource non-autorisée');
              break;
            case 404:
              this.alertService.show('Ressource inconnue');
              break;
            case 404:
              this.alertService.show('Ressource inconnue');
              break;
            case 409:
              this.alertService.show('Le user est déjà référencé. merci de le modifier');
              break;
            case 501:
            case 502:
            case 503:
            case 504:
              this.alertService.show('Erreur serveur');
              break;
            default:
              this.alertService.show('Erreur serveur');
          }
          return throwError(err.message);
        }
      })
    )

  }
}
