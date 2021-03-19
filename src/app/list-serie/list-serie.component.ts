import {Component, OnInit} from '@angular/core';

import {SerieModel} from '../models/serie.model';
import {SerieService} from '../Shared/services/serie.service';
import {UserService} from '../Shared/services/user.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Utilisateur} from '../models/utilisateur.model';


@Component({

  selector: 'app-list-serie',
  templateUrl: './list-serie.component.html',
  styleUrls: ['./list-serie.component.scss']
})
export class ListSerieComponent implements OnInit {

  subscriptionSerie: Subscription;
  subscriptionUser: Subscription;
  subscriptionSearch: Subscription;
  series: SerieModel[];
  results: SerieModel[];
  origineRating: string = "dbmovie";

  utilisateur: Utilisateur;

  // là, on définit un observable sur lequel on pourra faire de l'asynchrone et éviter les apples successifs de subscribe
  serieObs = new BehaviorSubject<Array<SerieModel>>([]);


  page: number;
  isLoading: boolean;


  constructor(public serieService: SerieService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoading = true;


    // SI le movies$ ne contient pas d'objet movieModel
    if (this.serieService.series$.getValue().length === 0) {
      // console.log('on a bien un appel au serieServce');
      this.serieService.getSeriesFromApi();
    }

    // on s'abonne à notre source de données movies$
    this.subscriptionSerie = this.serieService.series$.subscribe(
      (data: SerieModel[]) => {
        this.series = data;
        this.isLoading = false;
        console.log(' ===> ngoninit subscription serie');
      });
    this.serieObs = this.serieService.series$;
    // on s'abonne à la source de données search$
    this.subscriptionSearch = this.serieService.search$.subscribe(data => {

      this.results = data;
      // console.log(' ===> ngoninit subscription search');
    });

    this.subscriptionUser = this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
      // console.log(' ===> ngoninit subscription utilisateur');
    });
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
    if (searchText.trim().length < 3) {
      this.serieService.search$.next([]);
    } else {
      this.serieService.searchSeriesFromApi(searchText);
    }
  }

  ngOnDestroy() {
    this.subscriptionSerie.unsubscribe();


    this.subscriptionSearch.unsubscribe();


    this.subscriptionUser.unsubscribe();
  }

} // Fin class ListComponent
