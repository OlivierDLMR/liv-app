import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {CuttextPipe} from './pipes/cuttext.pipes';
import {LoginFormComponent} from './loging-form/login-form/login-form.component';
import {AccountFormComponent} from './account-form/account-form/account-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// les interceptors
import {LoaderInterceptor} from './Shared/interceptors/loader.interceptor';
import {ApiInterceptor} from './Shared/interceptors/api.interceptor';
import {ErrorsInterceptor} from './Shared/interceptors/errors.interceptor';
import {ListesnavbarComponent} from './listesnavbar/listesnavbar.component';
import {ListesuivisComponent} from './listesuivis/listesuivis.component';
import {SuiviComponent} from './suivi/suivi.component';
import {BoardComponent} from './board/board.component';
import {MaterialModule} from './Shared/Material/material.module';
import {RatingComponent} from './Shared/Ratings/ratings/rating.component';
import {ListSerieComponent} from './list-serie/list-serie.component';
import {DetailSerieComponent} from './detail-serie/detail-serie.component';
import { AjouterAUneListeComponent } from './ajouter-aune-liste/ajouter-aune-liste.component';
import { CuttextlongPipe } from './pipes/cuttextlong.pipe';
import { MajSuiviComponent } from './majSuivi/maj-suivi/maj-suivi.component';




@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    CuttextPipe,
    LoginFormComponent,
    AccountFormComponent,
    ListesnavbarComponent,
    ListesuivisComponent,
    SuiviComponent,
    BoardComponent,
    RatingComponent,
    ListSerieComponent,
    DetailSerieComponent,
    AjouterAUneListeComponent,
    CuttextlongPipe,
    MajSuiviComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    /* Import des components MaterialAngular*/
    MaterialModule,
    NgbModule,
   


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
