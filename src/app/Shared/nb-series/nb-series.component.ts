import { Component, Input, OnInit } from '@angular/core';
import { Suivi } from 'src/app/models/liste.model';
import { SuivisService } from '../services/suivis.service';

@Component({
  selector: 'app-nb-series',
  templateUrl: './nb-series.component.html',
  styleUrls: ['./nb-series.component.scss']
})
export class NbSeriesComponent implements OnInit {

  nbSerie:number;
  nbEpisode:number;

  @Input() suivi:Suivi;
  constructor(public suiviService:SuivisService) { }

  ngOnInit(): void {
    this.nbSerie=this.suivi.saisonEnCours;
    this.nbEpisode=this.suivi.dernierEpisodeVu;
  }

  plusSerie(){
    this.nbSerie +=1;
  }

  moinsSerie(){
    if (this.nbSerie > 0){
    this.nbSerie -=1;
    }
  }

  plusEpisode(){
    this.nbEpisode +=1;
  }

  moinsEpisode(){
    if (this.nbEpisode > 0){
    this.nbEpisode -=1;
    }
  }

  ngOnDestroy(){
    
        if (this.nbSerie!= this.suivi.saisonEnCours ||
          this.nbEpisode!=this.suivi.dernierEpisodeVu){
          this.suivi.saisonEnCours=this.nbSerie
          this.suivi.dernierEpisodeVu=this.nbEpisode
          this.suiviService.mettreAJourSuivi(this.suivi);
        }
  }  

}
