import { Component, OnInit } from '@angular/core';

import { SerieModel } from '../models/serie.model';
import { SerieService } from '../Shared/services/serie.service';
import { UserService } from '../Shared/services/user.service';
import {BehaviorSubject} from "rxjs";



@Component({
  
  selector: 'app-list-serie',
  templateUrl: './list-serie.component.html',
  styleUrls: ['./list-serie.component.scss']
})
export class ListSerieComponent implements OnInit {

  series: SerieModel[];
  results: SerieModel[];
  
  origineRating:string="dbmovie";

  // là, on définit un observable sur lequel on pourra faire de l'asynchrone et éviter les apples successifs de subscribe
  serieObs = new BehaviorSubject<Array<SerieModel>>([]);


  page: number;
  isLoading: boolean;


  constructor(public serieService: SerieService , public userService: UserService) {
    console.log('Je suis le constructor');

  }

  ngOnInit(): void {
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
    this.serieService.search$.subscribe(data => this.results = data);

    console.log("==> series : " ,this.series);
  } // Fin ngOnInit()

  printImageSrc(serie: SerieModel): string {
    return 'https://image.tmdb.org/t/p/w500' + serie.image;
  }


  // tslint:disable-next-line:typedef
  loadNextSeries() {
    this.isLoading = true;
    this.serieService.getNextSeriesFromApi();
  }

  // tslint:disable-next-line:typedef
  getListOpacity() {
    return this.isLoading ? 0.1 : 1;
  }

  // tslint:disable-next-line:typedef
  searchSeries(searchText: string) {
    console.log(searchText);
    if (searchText.trim().length < 3) {
      this.serieService.search$.next([]);
    }
    else {
      this.serieService.searchSeriesFromApi(searchText);
    }
  }



} // Fin class ListComponent
