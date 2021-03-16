import {Component, OnInit} from '@angular/core';

import {UserService} from '../Shared/services/user.service';
import {LoaderService} from '../Shared/services/loader.service';
import {Utilisateur} from '../models/utilisateur.model';
import {
  ListesNavBar,
  ListeSuivis,
  Preview,
  Saison,
  Statut,
  Suivi,
  SuiviCreation,
  TypePreview
} from '../models/liste.model';
import {SuivisService} from '../Shared/services/suivis.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {VideolistService} from '../Shared/services/videolist.service';
import {AlertService} from '../Shared/services/alert.service';
import {SerieModel} from '../models/serie.model';


@Component({
  selector: 'app-listesuivis',
  templateUrl: './listesuivis.component.html',
  styleUrls: ['./listesuivis.component.scss']
})
export class ListesuivisComponent implements OnInit {

  origineRating: string = 'maListe';

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

  suiveCreation: SuiviCreation;
  series: SerieModel[];
  saisons: Saison[];
  serie: SerieModel;
  totalSaisons: Saison[];

  subscriptionUtilisateur: Subscription;
  subscriptionListe: Subscription;


  constructor(public suivisService: SuivisService,
              public videoListService: VideolistService,
              public userService: UserService,
              public loaderService: LoaderService,
              private route: ActivatedRoute,
              public alertService: AlertService,
              private router: Router) {
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
    if (this.videoListService.listesuivis$.getValue().id === 0
      || this.videoListService.listesuivis$.getValue().id != this.listeId) {
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

  getListOpacity(): any {
    return this.isLoading ? 0.1 : 1;
  }

  supprimer(ev: any, suivi: Suivi): void {
    console.log(' ==> je supprime ', suivi);
    ev.stopPropagation();
    if (confirm('confirmez-vous la suppresssion de' + suivi.preview.titre + ' ?')) {
      this.suivisService.supprimerSuivi(suivi);
    }
  }

  updateSuiviSaisons(suivi: Suivi, newSaison): void {
    suivi.saisonEnCours = newSaison;
    this.suivisService.mettreAJourSuivi(suivi);
  }

  updateSuiviEpisode(suivi: Suivi, newEpisode): void {
    suivi.dernierEpisodeVu = newEpisode;
    this.suivisService.mettreAJourSuivi(suivi);
  }

  updateSaisonSerie(suivi: Suivi, videoListId: number): void {
    // console.log('updateSaisonSerie');
    // suivi.preview.dbMovieId;
    this.suiveCreation = new SuiviCreation(suivi.preview.dbMovieId,
      suivi.preview.image,
      suivi.noteUser,
      suivi.preview.overview,
      suivi.statut,
      suivi.preview.titre,
      0,
      TypePreview.SERIE,
      this.saisons,
    );
    let userID: number = this.userService.utilisateur$.getValue().id;
    // console.log(this.suiveCreation);
    this.suivisService.updateSaisonSerie(userID, videoListId, this.suiveCreation);
    this.alertService.show('les saisons de la série ' + suivi.preview.titre + ' sont à jour ');
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
