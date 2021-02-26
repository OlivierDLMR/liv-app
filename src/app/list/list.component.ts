import { Component, OnInit } from '@angular/core';

import { MovieModel } from '../models/movie.model';
import { MovieService } from '../Shared/services/movie.service';
import { UserService } from '../Shared/services/user.service';
import {BehaviorSubject} from "rxjs";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // movies:Array<Movieodel>
  movies: MovieModel[];
  results: MovieModel[];

   // là, on définit un observable sur lequel on pourra faire de l'asynchrone et éviter les apples successifs de subscribe
  movieObs = new BehaviorSubject<Array<MovieModel>>([]);


  page: number;
  isLoading: boolean;


  constructor(public movieService: MovieService , public userService: UserService) {
    console.log('Je suis le constructor');

  }

  ngOnInit(): void {
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


  } // Fin ngOnInit()

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

  searchMovies(searchText: string) {
    console.log(searchText);
    if (searchText.trim().length < 3) {
      this.movieService.search$.next([]);
    }
    else {
      this.movieService.searchMoviesFromApi(searchText);
    }
  }



} // Fin class ListComponent
