import { Component, OnInit } from '@angular/core';
import {SuivisService} from '../Shared/services/suivis.service';
import {UserService} from '../Shared/services/user.service';
import {Utilisateur} from '../models/utilisateur.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  utilisateur: Utilisateur;
  constructor(public suivisService: SuivisService, public userService: UserService) { }

  ngOnInit(): void {

    // yohohoho on en a besoin pour le isLogged :D
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur = data;
    });
  }

}
