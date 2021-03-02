import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../models/movie.model';
import {BehaviorSubject} from 'rxjs';
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

  page: number;
  isLoading: boolean;

  constructor(public movieService: MovieService , public serieService: SerieService, public userService: UserService) {
    console.log('Je suis le constructor du home');

  }

  ngOnInit(): void {
    // FILMS
    this.isLoading = true;
    // request à l'API theMovie
    this.movieService.getMoviesFromApi();

    // on s'abonne à notre source de données movies$
    this.movieService.movies$.subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
        this.isLoading = false;
      });
    this.movieObs = this.movieService.movies$;
    // on s'abonne à la source de données search$
    this.movieService.search$.subscribe(data => this.results = data);


    // SERIES
    this.isLoading = true;
    // request à l'API theMovie
    this.serieService.getSeriesFromApi();

    // on s'abonne à notre source de données movies$
    this.serieService.series$.subscribe(
      (data: SerieModel[]) => {
        this.series = data;
        this.isLoading = false;
      });
    this.serieObs = this.serieService.series$;
    // on s'abonne à la source de données search$
    this.serieService.search$.subscribe(data => this.resultSerie = data);


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



}
