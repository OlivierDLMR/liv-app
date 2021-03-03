import {Component, OnInit} from '@angular/core';

import {UserService} from '../Shared/services/user.service';
import {LoaderService} from '../Shared/services/loader.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, ListeSuivis, Suivi} from '../models/liste.model';
import {SuivisService} from '../Shared/services/suivis.service';

@Component({
  selector: 'app-listesuivis',
  templateUrl: './listesuivis.component.html',
  styleUrls: ['./listesuivis.component.scss']
})
export class ListesuivisComponent implements OnInit {

  utilisateur: Utilisateur;
  listes: ListesNavBar;
  listeSuivis: ListeSuivis;
  suivi: Suivi;
  suiviId: number;

  constructor(public suivisService: SuivisService, public userService: UserService, public loaderService: LoaderService) {
  }

  ngOnInit(): void {

    // yohohoho on en a besoin pour le isLogged :D
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
    });

    this.userService.listes$.subscribe(data => {
      this.listes = data;
      console.log('les suivis' + this.listes);
    });

    // this.suivisService.getSuivis(this.suiviId);
    // this.suivisService.listesuivis$.subscribe((data : ListeSuivis) => {
    //     this.listeSuivis = data;
    //   }
    // );
  }

}
