import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Import des components MaterialAngular*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CuttextPipe } from './pipes/cuttext.pipes';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    CuttextPipe,
    
    // RatingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
      /* Import des components MaterialAngular*/
    MatToolbarModule,
    MatSnackBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
