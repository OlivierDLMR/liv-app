import {Component, OnInit} from '@angular/core';

import {UserService} from '../Shared/services/user.service';
import {LoaderService} from '../Shared/services/loader.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, ListeSuivis, Preview, Statut, Suivi, TypePreview} from '../models/liste.model';
import {SuivisService} from '../Shared/services/suivis.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listesuivis',
  templateUrl: './listesuivis.component.html',
  styleUrls: ['./listesuivis.component.scss']
})
export class ListesuivisComponent implements OnInit {

  utilisateur: Utilisateur;
  listes: ListesNavBar;
  listeSuivis: ListeSuivis;
  suivi: Suivi;
  suiviId: number;
  listeId:number;
  listeName:string;
  isLoading: boolean;

  constructor(public suivisService: SuivisService, public userService: UserService, public loaderService: LoaderService, private route: ActivatedRoute) {
  }

  ngAfterViewChecked(): void{
    console.log ("=======> ng After .." )
    this.listeId = this.route.snapshot.params.id;
    this.listeName = this.route.snapshot.params.name;
  }

  ngOnInit(): void {
    console.log( "==> ngOninit");

    this.suivisService.listesuivis$.subscribe((data: ListeSuivis) => {
        this.listeSuivis = data;
        console.log('on est dans le liste suivis :' + data);
        console.log(this.listeSuivis);
      }
    );
        console.log(" ==> après subscribe" ,this.listeSuivis);
  }

  printImageSrc(preview: Preview): string {
    return 'https://image.tmdb.org/t/p/w500/' + preview.image;
  }

  getTypePreview(typePreview:TypePreview):string{
    return TypePreview[typePreview];
  }

  getStatut(typeStatut:Statut):string {
    return Statut[typeStatut];
  }

  isSerie(preview: Preview): boolean {
    console.log(" ==> before  is.serie : ", preview);
    if (TypePreview[preview.typePreview] == TypePreview.SERIE){
       console.log("      est une série !!!!!" ,preview.typePreview,TypePreview.SERIE );
      return true;
    }
    console.log("      est un film !!!!!",  preview.typePreview,TypePreview.FILM );          
    return false;
    
  } 

  getListOpacity() {
    return this.isLoading ? 0.1 : 1;
  }
}
