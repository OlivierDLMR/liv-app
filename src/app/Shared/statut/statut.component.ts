import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur.model";
import {ListesNavBar, ListeSuivis, Statut, Suivi} from "../../models/liste.model";
import {SuivisService} from "../services/suivis.service";
import {UserService} from "../services/user.service";
import {StatutService} from "../services/statut.service";
import {Style} from "@angular/cli/lib/config/schema";

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.scss']
})
export class StatutComponent implements OnInit {

  utilisateur: Utilisateur;
  listeSuivis: ListeSuivis;
  suiviReçu: Suivi;
  suiviId: number;
  listeId: number;
  isUpdatable: boolean;

  @Input() suivi: Suivi;

  constructor(public suivisService: SuivisService, public userService: UserService, public statutService:StatutService) {
  }

  ngOnInit(): void {
    this.isUpdatable = false;
  }

  getStatut(typeStatut: Statut): string {
    return Statut[typeStatut];
  }

  miseAJour(): void {
    console.log(' ===> miseA jour !!!');
    this.isUpdatable = true;
  }


  getColor(statut: Statut) {
    switch (statut) {
      case Statut.A_VOIR:
        return 'silver';
      case Statut.ABANDONNE:
        return 'black';
      case Statut.EN_COURS:
        return 'green';
      case Statut.VU:
        return 'orange';
    }
  }
}
