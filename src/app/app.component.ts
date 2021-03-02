import {Component, OnInit} from '@angular/core';
import {Utilisateur} from './models/utilisateur.model';
import {UserService} from './Shared/services/user.service';
import {LoaderService} from './Shared/services/loader.service';
import {ListesNavBar} from "./models/liste.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // variables d'affichage
  title = 'liv-app';
  loader: boolean = false;
  utilisateur: Utilisateur;


  constructor(public userService: UserService, public loaderService: LoaderService) {
    console.log(this);
  }

  ngOnInit() {
    console.log('==> appComonent ngOnInit !!!');
    console.log("      utilisateur : " , this.utilisateur);
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
      
    });
    this.userService.clearStorage();
  }

  logoutAction() {
    this.userService.logout();
  }
}
