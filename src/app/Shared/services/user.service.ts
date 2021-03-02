import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Utilisateur} from 'src/app/models/utilisateur.model';
import {AlertService} from './alert.service';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public utilisateur$ = new BehaviorSubject<Utilisateur>({
    id: 0,
    user: '',
    password: '',
    email: '',
    firstname: '',
    lastname: ''
  });

  public listes$ = new BehaviorSubject([]);

  private urlBackEnd: string = environment.BE_API_URL + '/liv/utilisateurs';

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
  }
clearStorage(){
localStorage.clear();
}
  logout() {
    this.clearStorage();
    this.router.navigate(['login']);
    this.alertService.show('Vous êtes déconnecté');
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }


  login(credentials) {
    console.log('==> user.service.ts login(credentieals) - credentials : ', credentials);
    console.log('supprimer la gestion du token dans getCompteUtilisateur(user:string)');

  }

// ==> Crer un utilisateur

  postCreationCompte(utilisateurObj: Utilisateur) {

    // le header ci-dessous est renigné dans apiInterceptor, du moins normalement !!! :)
    // let headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });

    this.http.post(this.urlBackEnd, utilisateurObj).subscribe(
      (responseApi: any) => {
        this.utilisateur$.next(responseApi);
        console.log(' ==> user.service.ts - postCreationComptepostCreationCompte : ');
        console.log('   ', responseApi);
      });
  }

  // ==> obtenir un utilisateur par son user
  getCompteUtilisateur(user: string) {
    this.http.get(this.urlBackEnd + '?user=' + user).subscribe(
      (response: any) => {
        this.utilisateur$.next(response);
        console.log(' ==> user.service.ts - getCompteutilisateur(: ' + user + ')');
        console.log('     response : ', response);
        console.log('     utilisateur$ ', this.utilisateur$);
        if (this.isLogged() == false) {
          localStorage.setItem('token', 'temporaire !!');
          this.http.get(this.urlBackEnd + '/' + this.utilisateur$.getValue().id + '/videolists').subscribe(
            (data: any) => {
              this.listes$.next(data);
              console.log(' ==> listes .service.ts - getListesutilisateur(: ' + this.utilisateur$.getValue().id + ')');
              console.log('     response : ', response);
              console.log('     listes ', this.listes$);
            });
        }
      });

  }

}
