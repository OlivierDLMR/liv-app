import { Component, OnInit } from '@angular/core';

import { MovieModel } from '../models/movie.model';
import { MovieService } from '../movie.service';

import { SerieModel } from '../models/serie.model';
import { SerieService } from '../serie.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // movies:Array<Movieodel>
  movies: MovieModel[];
  results: MovieModel[];

  series: SerieModel[];
  result2s: SerieModel[];

  page: number;
  isLoading: boolean;
  

  constructor(private movieService: MovieService, 
              private serieService: SerieService) {
    console.log('Je suis le constructor');
  }

  ngOnInit(): void {
    this.isLoading = true;
    // request à l'API theMovie
    this.movieService.getMoviesFromApi;
    this.serieService.getSeriesFromApi();
    // on s'abonne à notre source de données movies$
    this.movieService.movies$.subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
        this.isLoading = false;
      })
    this.serieService.series$.subscribe(
      (data: SerieModel[]) => {
        this.series = data;
        this.isLoading = false;
      }
    );
    // on s'abonne à la source de données search$
    this.movieService.search$.subscribe(data => this.results = data);
    this.serieService.search$.subscribe(data => this.result2s = data)

  } // Fin ngOnInit()

  printImageSrc(movie: MovieModel): string {
    return 'https://image.tmdb.org/t/p/w500' + movie.image;
  }
  printImageSerieSrc(serie: SerieModel): string {
    return 'https://image.tmdb.org/t/p/w500'+ serie.image;
  }

  // printVideoSrc(movie: MovieModel): string {
  //   return 'https://'
  // }

  loadNextMovies() {
    this.isLoading = true;
    this.movieService.getNextMoviesFromApi();
  }

  loadNextSeries(){
    this.isLoading = true;
    this.serieService.getNextSeriesFromApi();
  }

  getListOpacity() {
    return this.isLoading ? 0.1 : 1;
  }

  searchMovies(searchText: string) {
    console.log(searchText);
    if (searchText.trim().length == 0) {
      this.movieService.search$.next([]);
    }
    else {
      this.movieService.searchMoviesFromApi(searchText);
    }
  }

  searchSeries(searchText: string) {
    console.log(searchText);
    if (searchText.trim().length == 0) {
      this.serieService.search$.next([]);
    }else{
      this.serieService.searchSeriesFromApi(searchText);
    }
  }


} // Fin class ListComponent
