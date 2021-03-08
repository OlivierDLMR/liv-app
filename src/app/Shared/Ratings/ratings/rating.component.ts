import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rating', // on peut le changer, par défaut il il ajoute app-
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() score;
 
  stars: Array<number>;
  noStars: Array<number>;

  constructor() {

  }

  ngOnInit(): void {
    // console.log(this.score);
    let roundedScore = Math.round(this.score);
    this.calculeNbStars(roundedScore);
    this.stars = new Array(roundedScore).fill(1);
    // on a créé un tableau de "roundedScore" occurrences rempli de 1
    this.noStars= new Array(5-this.stars.length).fill(1);
  }
  plus(){
    console.log("==========> plus")
    if (this.stars.length < 5){
      this.calculeNbStars(this.stars.length + 1);
    }
  }
  moins(){
    console.log("==========>moins")
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
}

