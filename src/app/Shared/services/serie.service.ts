import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SerieModel } from '../../models/serie.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private API_URL = environment.TMDB_API_URL;
  private API_KEY = environment.TMDB_API_KEY;
  /*
   on créer un Subject series$
   la particularité des objets de type Subject
      > On peut observer le changement avec .subscribe()
      > On peut pousser une nouvelle data avec .next()
  */
  series$ = new BehaviorSubject([]);
  search$ = new BehaviorSubject([]);
  currentPage: number = 1;

  constructor(private http: HttpClient) { }
  /*
   Load 20 serie from API
  */
  getSeriesFromApi() {
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr',
        page: this.currentPage.toString()
      }
    });


    this.http
      .get(this.API_URL + '/discover/tv', { params })
      .pipe(map(
        (data: any) => data.results
          .map(
            serie => new SerieModel(
              serie.id,
              serie.name,
              serie.overview,
              serie.backdrop_path,
              serie.first_air_date,
              serie.vote_average,
              serie.key,
              serie.seasons
            )
          )
      )
      )
      .subscribe(response => {
        //this.series$.next(response);
        let series = this.series$.getValue();
        this.series$.next([...series, ...response]);
      })
  }

  /* getNextSeriesFromApi */
  getNextSeriesFromApi() {
    this.currentPage++;
    this.getSeriesFromApi();
  }

  /* searchSeriesFromApi(searchText)*/
  searchSeriesFromApi(searchText: string) {
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr',
        query: searchText
      }
    });

    this.http
      .get(this.API_URL + '/search/tv', { params })
      .pipe(map(
        (data: any) => data.results
          .map(
            serie => new SerieModel(
              serie.id,
              serie.name,
              serie.overview,
              serie.backdrop_path,
              serie.first_air_date,
              serie.vote_average,
              serie.key,
              serie.seasons
            )
          )
      )
      )
      .subscribe(response => {
        this.search$.next(response);
      })
  }






  getSerieInfo(serieId){
    //on peut setter HttpHeader pour mettre les paramètres
     const params = new HttpParams({fromObject: {
       api_key : this.API_KEY,
       language: 'fr'
        }});

     return this.http
     ///discover/tv est le EndPoint de l'API
     .get(this.API_URL + '/tv/' + serieId + '/videos', {params}); //renvoie un observable

   }








} // fin de la class SerieService
