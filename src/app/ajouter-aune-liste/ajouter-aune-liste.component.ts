import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../Shared/services/user.service';
import {SerieService} from '../Shared/services/serie.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, Saison, Statut, SuiviCreation, TypePreview} from '../models/liste.model';
import {MovieModel} from '../models/movie.model';
import {SuivisService} from '../Shared/services/suivis.service';
import {AlertService} from '../Shared/services/alert.service';
import {Router} from '@angular/router';
import { SerieModel} from '../models/serie.model';
import {Subscription} from 'rxjs';

interface Liste {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ajouter-aune-liste',
  templateUrl: './ajouter-aune-liste.component.html',
  styleUrls: ['./ajouter-aune-liste.component.scss']
})
export class AjouterAUneListeComponent implements OnInit {

  utilisateur: Utilisateur;
  listes: ListesNavBar;
  suiveCreation: SuiviCreation;
  movies: MovieModel[];
  series: SerieModel[];
  saisons: Saison[];

  subscriptionUtilisateur: Subscription;
  subscriptionListe: Subscription;

  @Input() movie: MovieModel;
  @Input() serie: SerieModel;

  constructor(public userService: UserService,
              public serieService: SerieService,
              public suiviService: SuivisService,
              public alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    // yohohoho on en a besoin pour le isLogged :D
    this.subscriptionUtilisateur = this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
    });

    this.subscriptionListe = this.userService.listes$.subscribe(data => {
      this.listes = data;
    });


  }

  ajoutSuiviFilm(videoListId: number, videoListName: string): void {
    this.suiveCreation = new SuiviCreation(
      this.movie.id,
      this.movie.image,
      0,
      this.movie.desc,
      Statut.A_VOIR,
      this.movie.title,
      0,
      TypePreview.FILM,
      Array<Saison>());
    this.suiviService.ajoutSuivi(this.utilisateur.id, videoListId, this.suiveCreation);
    this.alertService.show('le film est ajoute à la liste : ' + videoListName);
    this.router.navigate(['/listesuivis', videoListId]);
  }

  ajoutSuiviSerie(videoListId: number, videoListName: string): void {



    // this.serie.seasons.forEach(season => this.saisons.push(new Saison (season.episode_count)));
    console.log(this.saisons);

    this.suiveCreation = new SuiviCreation(this.serie.id,
      this.serie.image,
      0,
      this.serie.desc,
      Statut.A_VOIR,
      this.serie.title,
      0,
      TypePreview.SERIE,
      this.saisons,
     // this.serie.seasons.map(season => saison(season.episode_count))// mettre dans le constructeur list saison
      // this.utilisateur.id,
      // videoListId
    );
    this.suiviService.ajoutSuiviSerie(this.utilisateur.id, videoListId, this.suiveCreation);
    this.alertService.show('la serie est ajoutée à ma liste : ' + videoListName);
    this.router.navigate(['/listesuivis', videoListId]);
  }


  ngOnDestroy() {
    this.subscriptionUtilisateur.unsubscribe();
    this.subscriptionListe.unsubscribe();
  }

}
