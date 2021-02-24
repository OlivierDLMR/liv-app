import { Component, OnInit } from '@angular/core';

import { MovieModel } from '../models/movie.model';
import { MovieService } from '../Shared/services/movie.service';
import { UserService } from '../Shared/services/user.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // movies:Array<Movieodel>
  movies: MovieModel[];
  results: MovieModel[];

  page: number;
  isLoading: boolean;
  

  constructor(private movieService: MovieService , public userService: UserService) { 
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
      })
   
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
    if (searchText.trim().length == 0) {
      this.movieService.search$.next([]);
    }
    else {
      this.movieService.searchMoviesFromApi(searchText);
    }
  }



} // Fin class ListComponent
