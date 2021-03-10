import {Component, Input, OnInit} from '@angular/core';
import { Suivi } from 'src/app/models/liste.model';
import { isThisTypeNode } from 'typescript';
import { SuivisService } from '../../services/suivis.service';

@Component({
  selector: 'rating', // on peut le changer, par défaut il il ajoute app-
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() dbMovieScore;
  @Input() suivi:Suivi;
  @Input() origine;
 
  score:number;
  stars: Array<number>;
  noStars: Array<number>;

  constructor(public suiviService: SuivisService) {

  }

  ngOnInit(): void {
    

    if (this.isMaListe()){
      this.score=this.suivi.noteUser;
    }else{
      this.score=this.dbMovieScore;
    }

    let roundedScore = Math.round(this.score);
    this.calculeNbStars(roundedScore);
    this.stars = new Array(roundedScore).fill(1);
    // on a créé un tableau de "roundedScore" occurrences rempli de 1
    this.noStars= new Array(5-this.stars.length).fill(1);
  }
  plus(){
    if (this.stars.length < 5){
      this.calculeNbStars(this.stars.length + 1);
      
    }
  }
  moins(){
    if (this.stars.length > 0){
      this.calculeNbStars(this.stars.length - 1);
    }
  }

  calculeNbStars(nbStars:number){
    // on a créé un tableau du nombe d'étoiles rempli de 1
    this.stars = new Array(nbStars).fill(1);
    // on a créé un tableau de 5 moins le nombe d'étoiles) rempli de 1
    this.noStars= new Array(5-this.stars.length).fill(1);
  }

  isMaListe():boolean {
    if (this.origine == "maListe"){
      return true;
    }
    return false;
  }
  ngOnDestroy(){

    // console.log("ondestroy", this.score, this.suivi.noteUser);
    if (this.isMaListe()){ 
        if (this.stars.length!= this.suivi.noteUser){
          this.suivi.noteUser=this.stars.length;
          this.suiviService.mettreAJourSuivi(this.suivi);
        }
      }

  } 
}

