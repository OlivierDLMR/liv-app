import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {Suivi, SuiviCreation} from '../../models/liste.model';

@Injectable({
  providedIn: 'root'
})
export class SuivisService {


  private urlBackEndSuivi: string = environment.BE_API_URL + '/liv/suivis';

  private dateInit = new Date();



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




  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {

  }



  mettreAJourSuivi(suivi: Suivi) {
    this.http.post(this.urlBackEndSuivi, suivi).subscribe(
      (data: any) => {
        this.suiviCreation$.next(data);
      }
    );
  }

  supprimerSuivi(suivi:Suivi){
    this.http.delete(this.urlBackEndSuivi + "/delete/" + suivi.id).subscribe(
      (data: any) => {
        console.log("retour  delete : ", data)
        // this.listesuivis$.next(
          // this.listesuivis$.getValue().suivis.filter((suiviASupprimer:any)=> suiviASupprimer.id !=suivi.id)
        // );
      }
    );
  }

  ajoutSuivi(utilisateurId: number, videoListId: number, suivi: SuiviCreation): void {
    this.http.put(this.urlBackEndSuivi + "/"
      + utilisateurId + "/"
      + videoListId, suivi).subscribe(
      (data: any) => {
      }
    );
  }



}
