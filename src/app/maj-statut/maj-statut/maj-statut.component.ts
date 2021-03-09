import { Component, OnInit } from '@angular/core';
import { Statut } from 'src/app/models/liste.model';


@Component({
  selector: 'app-maj-statut',
  templateUrl: './maj-statut.component.html',
  styleUrls: ['./maj-statut.component.scss']
})
export class MajStatutComponent implements OnInit {
statut=Statut;
statutLibelles:any;
  constructor() { }

  ngOnInit(): void {
    this.statutLibelles = Object.keys(this.statut).map(k =>this.statut[k] as string);
  }
}

