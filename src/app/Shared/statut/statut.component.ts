import {Component, Input, OnInit} from '@angular/core';
import {Utilisateur} from "../../models/utilisateur.model";
import {ListeSuivis, Statut, Suivi} from "../../models/liste.model";
import {SuivisService} from "../services/suivis.service";
import {UserService} from "../services/user.service";
import {StatutService} from "../services/statut.service";

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
 

  statut=Statut;
  statutLibelles:any;

  @Input() suivi: Suivi;

  constructor(public suivisService: SuivisService, public userService: UserService, public statutService:StatutService) {
  }

  
  

  ngOnInit(): void {
    console.log ( "===> maj-statut-component : ");
    console.log ( "     ===>ngOnInit : ");
    console.log ("           statut", this.statut);
    this.statutLibelles = Object.keys(this.statut).map(k =>this.statut[k] as string);
    console.log ("          work : " ,this.statutLibelles);
  }

  getStatut(typeStatut: Statut): string {
    return Statut[typeStatut];
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
