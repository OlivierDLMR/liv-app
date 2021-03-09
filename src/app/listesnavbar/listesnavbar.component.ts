import {Component, OnInit} from '@angular/core';
import {SuivisService} from '../Shared/services/suivis.service';
import {Utilisateur} from '../models/utilisateur.model';
import {UserService} from '../Shared/services/user.service';
import {LoaderService} from '../Shared/services/loader.service';
import {ListesNavBar, ListeSuivis, Videolist} from '../models/liste.model';
import {Router} from "@angular/router";

// import {SuivisService} from "../Shared/services/suivis.service";

@Component({
  selector: 'app-listesnavbar',
  templateUrl: './listesnavbar.component.html',
  styleUrls: ['./listesnavbar.component.scss']
})
export class ListesnavbarComponent implements OnInit {

  utilisateur: Utilisateur;
  listes: ListesNavBar;

  // listsuivis: any[];

  constructor(public suivisService: SuivisService
    , public userService: UserService
    , public loaderService: LoaderService
    , private router: Router) {
  }

  ngOnInit(): void {
    // yohohoho on en a besoin pour le isLogged :D
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
    });

    this.userService.listes$.subscribe(data => {
      this.listes = data;
    });
  }

  onClickList(listeid) {
    this.suivisService.getSuivis(listeid);
  }

  /**
   * Add list for user
   */
  addList(): void {
    const nameList: string = window.prompt('Renseigner un nom de liste');
    /*
    * pour ajouter une liste : un pop up demande le nom
    * il faut un nom de liste non  null avec au moins 3 caractères
    * */
    if (nameList !== null && nameList.trim().length > 3) {
      /*
      * alerte si le nom de la liste existe dejà pour l'utilisateur
      * */
      if (this.listes.some(liste => liste.name.toLowerCase()  === nameList.toLowerCase() )) {
        alert('La valeur existe!');
      }
      /* si pas d'alerte, on créée une nouvelle liste */
      this.suivisService.createList(nameList);
    }
  }
}
