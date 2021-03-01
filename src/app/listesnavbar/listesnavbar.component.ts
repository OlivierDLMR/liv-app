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
    console.log('==> navbarcomponent ngOnInit !!!');
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
    });

    console.log("je suis dans la navbar");
    // this.suivisService.getListesUtilisateur(this.utilisateur.id);
    this.suivisService.listes$.subscribe(data => this.listes = data);

  }

}
