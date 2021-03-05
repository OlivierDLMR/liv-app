import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from '../../models/utilisateur.model';
import {ListeSuivis, Statut, Suivi} from '../../models/liste.model';
import {SuivisService} from '../services/suivis.service';
import {UserService} from '../services/user.service';
import {StatutService} from '../services/statut.service';

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

  constructor(public suivisService: SuivisService, public userService: UserService, public statutService: StatutService) {
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


  getColor(statut: Statut): string {
    console.log('on est dans le getColor' + statut);
    if (statut === Statut.A_VOIR) {
      console.log('Statut.A_VOIR ===');
      return 'avoir';
    }
    if (statut === Statut.ABANDONNE) {
      return 'abandonne';
    }
    if (statut === Statut.EN_COURS) {
      return 'encours';
    }
    if (statut === Statut.VU) {
      console.log('Statut.VU');
      return 'vu';
    }
  }
}
