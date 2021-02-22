import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// importer la class HttpClientmodule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import { CuttextPipe } from './pipes/cuttext.pipes';
// import { RatingsComponent } from './shared/ratings/ratings.component';

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
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
