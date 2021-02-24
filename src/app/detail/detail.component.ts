import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../Shared/services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  /*
    injecter un objet de la class ActivatedRoute
    permet de récupérer le paramètre id de l'url
    ** avec .snapshot.params.id
  */
  movieId: number;
  type: string;
  movie;
  urlYTMovie:any;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // 1 recuperer l'ID du film ET le type ('movies', ou 'results')
    this.movieId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;
    

    if (this.type == 'movies') {
      // 2 récupérer les informations du film
      this.movie = this.movieService.movies$.getValue()
        .find(movie => movie.id == this.movieId);
    }
    else {
      // 2 récupérer les informations du film
      this.movie = this.movieService.search$.getValue()
        .find(movie => movie.id == this.movieId);
    }


    this.movieService   
          .getMovieInfo(this.movieId)
          .subscribe( (data:any)=> {
                      this.urlYTMovie =
                      this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+data.results[0].key);
                            });





  } // fin ngOnInit()


  goToRootPage() {
    this.movieService.search$.next([]);
    this.router.navigate(['/']);
  }

}
