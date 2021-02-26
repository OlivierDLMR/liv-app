import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rating', // on peut le changer, par défaut il il ajoute app-
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() score;
  number;
  stars: Array<number>;

  constructor() {

  }

  ngOnInit(): void {
    // console.log(this.score);
    let roundedScore = Math.round(this.score);
    this.stars = new Array(roundedScore).fill(1);
    // on a créé un tableau de "roundedScore" occurrences rempli de 1
  }

}

