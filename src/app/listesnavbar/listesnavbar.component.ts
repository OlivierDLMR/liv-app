import {Component, OnInit} from '@angular/core';
import {SuivisService} from '../Shared/services/suivis.service';
import {Utilisateur} from "../models/utilisateur.model";
import {UserService} from "../Shared/services/user.service";
import {LoaderService} from "../Shared/services/loader.service";
import {ListesNavBar} from "../models/liste.model";

// import {SuivisService} from "../Shared/services/suivis.service";

@Component({
  selector: 'app-listesnavbar',
  templateUrl: './listesnavbar.component.html',
  styleUrls: ['./listesnavbar.component.scss']
})
export class ListesnavbarComponent implements OnInit {

  utilisateur: Utilisateur;
  listes: ListesNavBar;

  constructor(public suivisService: SuivisService, public userService: UserService, public loaderService: LoaderService) {
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

}
