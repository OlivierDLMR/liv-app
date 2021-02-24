import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieModel } from '../../models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL = environment.TMDB_API_URL;
  private API_KEY = environment.TMDB_API_KEY;
  /*
   on créer un Subject movies$
   la particularité des objets de type Subject
      > On peut observer le changement avec .subscribe()
      > On peut pousser une nouvelle data avec .next()
  */
  movies$ = new BehaviorSubject([]);
  search$ = new BehaviorSubject([]);
  currentPage: number = 1;

  constructor(private http: HttpClient) { }
  /*
   Load 20 movies from API
  */
  getMoviesFromApi() {
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr',
        page: this.currentPage.toString()
      }
    });
    console.log(params);

    this.http
      .get(this.API_URL + '/discover/movie', { params })
      .pipe(map(
        (data: any) => data.results
          .map(
            movie => new MovieModel(
              movie.id,
              movie.title,
              movie.overview,
              movie.backdrop_path,
              movie.release_date,
              movie.vote_average,
              movie.key
            )
          )
      )
      )
      .subscribe(response => {
        console.log(response);
        //this.movies$.next(response);
        let movies = this.movies$.getValue();
        this.movies$.next([...movies, ...response]);
      })
  }

  /* getNextMoviesFromApi */
  getNextMoviesFromApi() {
    this.currentPage++;
    this.getMoviesFromApi();
  }

  /* searchMoviesFromApi(searchText)*/
  searchMoviesFromApi(searchText: string) {
    const params = new HttpParams({
      fromObject: {
        api_key: this.API_KEY,
        language: 'fr',
        query: searchText
      }
    });
    console.log(params);

    this.http
      .get(this.API_URL + '/search/movie', { params })
      .pipe(map(
        (data: any) => data.results
          .map(
            movie => new MovieModel(
              movie.id,
              movie.title,
              movie.overview,
              movie.backdrop_path,
              movie.release_date,
              movie.vote_average,
              movie.key
            )
          )
      )
      )
      .subscribe(response => {
        console.log(response);
        this.search$.next(response);
      })
  }






  getMovieInfo(movieId){
    //on peut setter HttpHeader pour mettre les paramètres
     const params = new HttpParams({fromObject: {
       api_key : this.API_KEY,
       language: 'fr'
        }});
      
     return this.http
     ///discover/movie est le EndPoint de l'API
     .get(this.API_URL+'/movie/'+movieId+'/videos', {params}); //renvoie un observable
   
   }








} // fin de la class MovieService