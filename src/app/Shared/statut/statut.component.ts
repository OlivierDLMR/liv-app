import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from '../../models/utilisateur.model';
import {ListeSuivis, Statut, Suivi} from '../../models/liste.model';
import {SuivisService} from '../services/suivis.service';
import {UserService} from '../services/user.service';
import {StatutService} from '../services/statut.service';

interface Choice {
  value: string;
  label: string;
}

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

  statut = Statut;
  statutLibelles: any;
  statutValues: any;

  choices: Choice[] = [
    {value: this.statut.EN_COURS, label: 'en cours'},
    {value: this.statut.VU, label: 'vu'},
    {value: this.statut.A_VOIR, label: 'a voir'},
    {value: this.statut.ABANDONNE, label: 'abandonné'}
  ];

  @Input() suivi: Suivi;

  constructor(public suivisService: SuivisService, public userService: UserService, public statutService: StatutService) {
  }


  ngOnInit(): void {
    console.log("===> maj-statut-component : ");
    console.log("     ===>ngOnInit : ");
    console.log("           statut", this.statut);
    this.statutLibelles = Object.keys(this.statut).map(k => {
      return {value: k, label: this.statut[k] as string}
    });
    //this.statutValues = Object.keys(this.statut).map(k => k as string);
    console.log("          work : ", this.statutLibelles);
  }

  getStatut(typeStatut: Statut): string {
    return Statut[typeStatut];
  }

  changeStatut(selectValue: string): void {
    switch (selectValue) {
      case 'A_VOIR':
        this.suivi.statut = Statut.A_VOIR;
        break;
      case 'VU':
        this.suivi.statut = Statut.VU;
        break;
      case 'ABANDONNE':
        this.suivi.statut = Statut.ABANDONNE;
        break;
      case 'EN_COURS':
        this.suivi.statut = Statut.EN_COURS;
        break;
    }
  }


  miseAJour(): void {
    console.log(' ===> miseA jour !!!');
    this.isUpdatable = true;
  }


  // getColor(statut: Statut): string {
  //   console.log('on est dans le getColor');
  //   switch (statut) {
  //     case Statut.A_VOIR:
  //       return 'a_voir';
  //     case Statut.ABANDONNE:
  //       return 'abandonne';
  //     case Statut.EN_COURS:
  //       return 'en_cours';
  //     case Statut.VU:
  //       return 'vu';
  //   }
  // }
}
