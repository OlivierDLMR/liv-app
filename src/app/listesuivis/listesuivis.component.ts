import {Component, OnInit} from '@angular/core';

import {UserService} from '../Shared/services/user.service';
import {LoaderService} from '../Shared/services/loader.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, ListeSuivis, Preview, Statut, Suivi, TypePreview} from '../models/liste.model';
import {SuivisService} from '../Shared/services/suivis.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { VideolistService } from '../Shared/services/videolist.service';


@Component({
  selector: 'app-listesuivis',
  templateUrl: './listesuivis.component.html',
  styleUrls: ['./listesuivis.component.scss']
})
export class ListesuivisComponent implements OnInit {

  origineRating: string = "maListe";

  utilisateur: Utilisateur;
  listes: ListesNavBar;
  listeSuivis: ListeSuivis;
  suivi: Suivi;
  suiviId: number;
  listeId: number;
  listeName: string;
  isLoading: boolean;

  isTouched = [];

  subscription: Subscription;


  constructor(public suivisService: SuivisService,
    public videoListService: VideolistService,
              public userService: UserService,
              public loaderService: LoaderService,
              private route: ActivatedRoute) {
  }

  // ngAfterViewChecked(): void {
  //
  //   this.listeId = this.route.snapshot.params.id;
  //   this.listeName = this.route.snapshot.params.name;
  // }

  ngOnInit(): void {
    this.listeId = this.route.snapshot.params.id;
    this.listeName = this.route.snapshot.params.name;
    this.subscription = this.videoListService.listesuivis$.subscribe((data: ListeSuivis) => {
        this.listeSuivis = data;
      }

    );
console.log(  "this.videoListService.listesuivis$.getValue().id",this.videoListService.listesuivis$.getValue().id);
console.log( "this.liste.id : " , this.listeSuivis.id)
    if (this.videoListService.listesuivis$.getValue().id === 0
      ||this.videoListService.listesuivis$.getValue().id !=this.listeId ) {
      this.videoListService.getSuivis(this.listeId);
    }
  }

  printImageSrc(preview: Preview): string {
    return 'https://image.tmdb.org/t/p/w500/' + preview.image;
  }

  getTypePreview(typePreview: TypePreview): string {
    return TypePreview[typePreview];
  }

  getStatut(typeStatut: Statut): string {
    return Statut[typeStatut];
  }

  isSerie(preview: Preview): boolean {
    if (TypePreview[preview.typePreview] == TypePreview.SERIE) {
      return true;
    }
    return false;

  }

  getListOpacity() {
    return this.isLoading ? 0.1 : 1;
  }

  miseAJour(suivi: Suivi): void {
    console.log(" ===> miseA jour !!!")
    console.log("              ", suivi);

  }

  supprimer(ev:any,suivi:Suivi):void{
    console.log(" ==> je supprime ", suivi);
    ev.stopPropagation();
    if (confirm("confirmez-vous la suppresssion de" + suivi.preview.titre + " ?")){
       this.suivisService.supprimerSuivi(suivi)
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
