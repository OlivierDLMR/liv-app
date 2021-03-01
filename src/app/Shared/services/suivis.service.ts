import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuivisService {

  public user$ = new BehaviorSubject([]);
  public listes$ = new BehaviorSubject([]);
  public listesuivis$ = new BehaviorSubject([]);
  public suivi$ = new BehaviorSubject([]);
  public preview$ = new BehaviorSubject([]);
  public filmRef$ = new BehaviorSubject([]);
  public serieRef$ = new BehaviorSubject([]);

  private BE_API_URL_BASE = environment.BE_API_URL;


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void{}

  // getListesSuivis(users$) : {
  //   this.http.get(this.BE_API_URL_BASE + "liv/utilisateurs/" + this.user$ + "/videolists").subscribe(
  //   (response: any) => {
  //   this.listes$.next(response);
  //   console.log(" ==> suivi.service.ts - getlistes(: " + this.user$ + ")");
  //   console.log("     response : ", response);
  //   console.log("     listes$ ", this.listes$);
  // });

 // }

}
