import {Component, Input, OnInit} from '@angular/core';
import {Statut, Suivi} from "../../models/liste.model";
import {SuivisService} from "../services/suivis.service";
import {UserService} from "../services/user.service";
import {StatutService} from "../services/statut.service";

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

  statutSaved:Statut;

  statut = Statut;
  
  choices: Choice[] = [
    {value: this.statut.EN_COURS, label: 'en cours'},
    {value: this.statut.VU, label: 'vu'},
    {value: this.statut.A_VOIR, label: 'a voir'},
    {value: this.statut.ABANDONNE, label: 'abandonné'}
  ];

  @Input() suivi: Suivi;


  // constructor(public statutService: StatutService) {
  // }

  constructor(public suiviService: SuivisService) {

   }

  ngOnInit(): void {
    this.statutSaved=this.suivi.statut;
  }

  getStatut(typeStatut: Statut): string {
    return Statut[typeStatut];
  }

  changeStatut(selectStatut: Statut): void {
    this.statutSaved=selectStatut;

  }

  ngOnDestroy(){

    // console.log("ondestroy", this.score, this.suivi.noteUser);
    if (this.statutSaved!= this.suivi.statut){
          this.suivi.statut=this.statutSaved;
          this.suiviService.mettreAJourSuivi(this.suivi);
      }

  } 

}
