import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {Saison, Suivi, SuiviCreation} from '../../models/liste.model';
import {SerieService} from './serie.service';

@Injectable({
  providedIn: 'root'
})
export class SuivisService {


  saisons: Saison[];
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
  private dateInit = new Date();

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService, public serieService: SerieService) {

  }


  mettreAJourSuivi(suivi: Suivi): void {
    this.http.post(this.urlBackEndSuivi, suivi).subscribe(
      (data: any) => {
        this.suiviCreation$.next(data);
      }
    );
  }

  supprimerSuivi(suivi: Suivi): void {
    this.http.delete(this.urlBackEndSuivi + '/delete/' + suivi.id).subscribe(
      (data: any) => {
        console.log('retour  delete : ', data);
        // this.listesuivis$.next(
        // this.listesuivis$.getValue().suivis.filter((suiviASupprimer:any)=> suiviASupprimer.id !=suivi.id)
        // );
      }
    );
  }

  ajoutSuivi(utilisateurId: number, videoListId: number, suivi: SuiviCreation): void {

    this.http.put(this.urlBackEndSuivi + '/'
      + utilisateurId + '/'
      + videoListId, suivi).subscribe(
      (data: any) => {
      }
    );
  }

  ajoutSuiviSerie(utilisateurId: number, videoListId: number, suivi: SuiviCreation): void {
    this.serieService
      .getSerieSeasons(suivi.dbMovieId)
      .subscribe((data: any) => {
        console.log(data);
        // pour chaque element du tableau data.seasons creation d'une nouvelle occurence dans this.saisons
        // this.saisons est composé d'élément saison que je construis avec le nb d'épisodes d'une occurence de data.seasons
        data.seasons.forEach(toto => this.saisons.push(new Saison(toto.episode_count)));
        console.log(this.saisons);
        suivi.saisons = this.saisons;
        console.log(suivi);
        this.http.put(this.urlBackEndSuivi + '/'
          + utilisateurId + '/'
          + videoListId, suivi).subscribe(
          (result: any) => {
          }
        );
      });
  }


}
