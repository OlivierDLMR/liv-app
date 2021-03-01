import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';
import {Utilisateur} from '../../models/utilisateur.model';
import {ListesNavBar} from "../../models/liste.model";

@Injectable({
  providedIn: 'root'
})
export class SuivisService {

  public utilisateur$ = new BehaviorSubject<Utilisateur>({
    id: 0,
    user: '',
    password: '',
    email: '',
    firstname: '',
    lastname: ''
  });

  public listes$ = new BehaviorSubject([]);
  public listesuivis$ = new BehaviorSubject([]);
  public suivi$ = new BehaviorSubject([]);
  public preview$ = new BehaviorSubject([]);
  public filmRef$ = new BehaviorSubject([]);
  public serieRef$ = new BehaviorSubject([]);


  private urlBackEnd: string = environment.BE_API_URL + '/liv/utilisateurs/';

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {

  }

}
