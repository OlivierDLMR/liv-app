import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/* Import des components MaterialAngular*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CuttextPipe } from './pipes/cuttext.pipes';
import { LoginFormComponent } from './loging-form/login-form/login-form.component';
import { AccountFormComponent } from './account-form/account-form/account-form.component';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    CuttextPipe,
    LoginFormComponent,
    AccountFormComponent,
    
    // RatingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
      /* Import des components MaterialAngular*/
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
