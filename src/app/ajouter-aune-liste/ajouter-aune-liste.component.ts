import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../Shared/services/user.service';
import {SerieService} from '../Shared/services/serie.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, Statut, SuiviCreation, TypePreview} from '../models/liste.model';
import {FormControl} from '@angular/forms';
import {MovieService} from '../Shared/services/movie.service';
import {MovieModel} from '../models/movie.model';

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
  @Input() movie: MovieModel;

  constructor(public userService: UserService, public serieService: SerieService) {
  }

  ngOnInit(): void {
    // yohohoho on en a besoin pour le isLogged :D
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
    });

    this.userService.listes$.subscribe(data => {
      this.listes = data;
      console.log('les listes' + this.listes);
    });

  }

  ajoutSuivi(videoListId: number): void {
    this.suiveCreation.dbMovieId = this.movie.id;

    this.suiveCreation.image = this.movie.image;
    this.suiveCreation.noteUser = 0;
    this.suiveCreation.overview = this.movie.desc;
    this.suiveCreation.statut = Statut.A_VOIR;
    this.suiveCreation.titre = this.movie.title;
    this.suiveCreation.totalSaison = 0;
    this.suiveCreation.typePreview = TypePreview.FILM;
    this.suiveCreation.userId = this.utilisateur.id;
    this.suiveCreation.videoListId = videoListId;
  }

}
