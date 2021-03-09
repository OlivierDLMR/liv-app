import {Component, OnInit} from '@angular/core';

import {UserService} from '../Shared/services/user.service';
import {LoaderService} from '../Shared/services/loader.service';
import {Utilisateur} from '../models/utilisateur.model';
import {ListesNavBar, ListeSuivis, Preview, Statut, Suivi, TypePreview} from '../models/liste.model';
import {SuivisService} from '../Shared/services/suivis.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


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
    console.log(this.listeId);
    this.subscription = this.suivisService.listesuivis$.subscribe((data: ListeSuivis) => {
        console.log(data);
        this.listeSuivis = data;
        console.log('on est dans le liste suivis :' + data);
        // this.listeSuivis.suivis.every(elem => elem.isUpdatable = false);
        console.log(this.listeSuivis);

        // for (let suivi of data) {
        //   let obj = {id: suivi.id, touched: false};
        //   this.isTouched.push(obj)
        // }
        console.log(this.isTouched);
      }
    );
    console.log(' ==> après subscribe', this.listeSuivis);

    if (this.suivisService.listesuivis$.getValue().id === 0) {
      this.suivisService.getSuivis(this.listeId);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
