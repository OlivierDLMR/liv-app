import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../Shared/services/user.service';
import {SerieService} from '../Shared/services/serie.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, Statut, SuiviCreation, TypePreview} from '../models/liste.model';
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
    console.log(this.movie);

  }

  ajoutSuivi(videoListId: number): void {
    this.suiveCreation = new SuiviCreation(this.movie.id,
                                            this.movie.image,
                                            0,
                                            this.movie.desc,
                                            Statut.A_VOIR,
                                            this.movie.title,
                                              0,
                                              TypePreview.FILM,
                                            this.utilisateur.id,
                                              videoListId);
    console.log('ajoutSuivi: ' + this.suiveCreation);
  }

}
