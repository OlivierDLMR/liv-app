import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {ListeSuivis, Saison, Suivi, SuiviCreation, TypePreview} from '../../models/liste.model';
import {SerieService} from './serie.service';
import { VideolistService } from './videolist.service';

@Injectable({
  providedIn: 'root'
})
export class SuivisService {



  public suiviCreation$ = new BehaviorSubject({
    dbMovieId: '',
    image: '',
    noteUser: 0,
    overview: '',
    statut: 'A_VOIR',
    titre: '',
    totalSaison: 0,
    typePreview: 'FILM',
    userId: 0,
    videoListId: 0,
  });
  private urlBackEndSuivi: string = environment.BE_API_URL + '/liv/suivis';
  private urlUpDateSerie: string = environment.BE_API_URL + '/liv/series';

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private videolistService: VideolistService,
              private serieService: SerieService) {

  }


  mettreAJourSuivi(suivi: Suivi): void {
    this.http.post(this.urlBackEndSuivi, suivi).subscribe(
      (data: any) => {
        this.suiviCreation$.next(data);
      }
    );
  }

  supprimerSuivi(suivi: Suivi): void {
    this.http.delete(this.urlBackEndSuivi + '/' + suivi.id).subscribe(
      (responseIdDeleted: number) => {
          if (responseIdDeleted===suivi.id){
            this.videolistService.supprimeSuiviDansListeSuiviBehavior(suivi.id);
            this.alertService.show( '" ' + suivi.preview.titre + ' " a été supprimé de la liste');
          };
      });

  }

  ajoutSuivi(utilisateurId: number, videoListId: number, suivi: SuiviCreation): void {

    this.http.put(this.urlBackEndSuivi + '/'
      + utilisateurId + '/'
      + videoListId, suivi).subscribe(
      (data: ListeSuivis) => {
        this.videolistService.mettreAjourListeSuiviBehavior(data)
        this.alertService.show('le film " ' + suivi.titre + ' " a été ajouté à la liste');

      }
    );
  }

  ajoutSuiviSerie(utilisateurId: number, videoListId: number, suivi: SuiviCreation): void {
    let saisons = new Array<Saison>();
    this.serieService
      .getSerieSeasons(suivi.dbMovieId)
      .subscribe((data: any) => {
        // pour chaque element du tableau data.seasons creation d'une nouvelle occurence dans this.saisons
        // this.saisons est composé d'élément saison que je construis avec le nb d'épisodes d'une occurence de data.seasons
        data.seasons.forEach(toto => saisons.push(new Saison(toto.episode_count)));
        suivi.saisons = saisons;
        console.log(saisons);
        this.http.put(this.urlBackEndSuivi + '/'
          + utilisateurId + '/'
          + videoListId, suivi).subscribe(
          (data: ListeSuivis) => {
            this.videolistService.mettreAjourListeSuiviBehavior(data)
            this.alertService.show('la série " ' + suivi.titre + ' " a été ajoutée à la liste');
          }
        );
      });
  }
  updateSaisonSerie(utilisateurId: number, videoListId: number, suivi: SuiviCreation): void {
    let saisons = new Array<Saison>();
    // console.log(suivi);
    // console.log(localStorage);
    this.serieService
      .getSerieSeasons(suivi.dbMovieId)
      .subscribe((data: any) => {
        // pour chaque element du tableau data.seasons creation d'une nouvelle occurence dans this.saisons
        // this.saisons est composé d'élément saison que je construis avec le nb d'épisodes d'une occurence de data.seasons
        data.seasons.forEach(toto => saisons.push(new Saison(toto.episode_count)));
        suivi.saisons = saisons;
        this.http.post(this.urlUpDateSerie + '/'
          + utilisateurId + '/'
          + videoListId, suivi).subscribe(
          (data: ListeSuivis) => {
            this.videolistService.mettreAjourListeSuiviBehavior(data);
          }
        );
      });
  }
}
