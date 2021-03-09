import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../models/movie.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MovieService} from '../Shared/services/movie.service';
import {UserService} from '../Shared/services/user.service';
import {SerieModel} from '../models/serie.model';
import {SerieService} from '../Shared/services/serie.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  // films
  movies: MovieModel[];
  results: MovieModel[];
  movieObs = new BehaviorSubject<Array<MovieModel>>([]);
  // SERIES
  series: SerieModel[];
  resultSerie: SerieModel[];
  serieObs = new BehaviorSubject<Array<SerieModel>>([]);

  origineRating:string='dbmovie';

  subscriptionMovie: Subscription;
  subscriptionSerie: Subscription;

  page: number;
  isLoading: boolean;

  constructor(public movieService: MovieService , public serieService: SerieService, public userService: UserService) {

  }

  ngOnInit(): void {
    // FILMS
    this.isLoading = true;
    // request à l'API theMovie
    //this.movieService.getMoviesFromApi();

    // on s'abonne à notre source de données movies$
    this.subscriptionMovie = this.movieService.movies$.subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
        this.isLoading = false;
      });
    this.movieObs = this.movieService.movies$;


    if (this.movieService.movies$.getValue().length === 0) {
      this.movieService.getMoviesFromApi();
    }


    // SERIES
    this.isLoading = true;
    // request à l'API theMovie
    //this.serieService.getSeriesFromApi();

    // on s'abonne à notre source de données movies$
    this.subscriptionSerie = this.serieService.series$.subscribe(
      (data: SerieModel[]) => {
        this.series = data;
        this.isLoading = false;
      });
    this.serieObs = this.serieService.series$;

    if (this.serieService.series$.getValue().length === 0) {
      this.serieService.getSeriesFromApi();
    }




  } // Fin ngOnInit()

  // FILMS
  printImageSrc(movie: MovieModel): string {
    return 'https://image.tmdb.org/t/p/w500' + movie.image;
  }


  loadNextMovies() {
    this.isLoading = true;
    this.movieService.getNextMoviesFromApi();
  }

  getListOpacity() {
    return this.isLoading ? 0.1 : 1;
  }

//  SERIES
  printImageSrcSerie(serie: SerieModel): string {
    return 'https://image.tmdb.org/t/p/w500' + serie.image;
  }


  // tslint:disable-next-line:typedef
  loadNextSeries() {
    this.isLoading = true;
    this.serieService.getNextSeriesFromApi();
  }

  // tslint:disable-next-line:typedef
  getListOpacitySerie() {
    return this.isLoading ? 0.1 : 1;
  }

  ngOnDestroy() {
    this.subscriptionMovie.unsubscribe();
    this.subscriptionSerie.unsubscribe();
  }


}
