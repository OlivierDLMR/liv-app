import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Utilisateur} from 'src/app/models/utilisateur.model';
import {AlertService} from './alert.service';
import {environment} from '../../../environments/environment';

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
  public listeSuivis$ = new BehaviorSubject([]);

  private urlBackEnd: string = environment.BE_API_URL + '/liv/utilisateurs';
  private urlAuhtenticate: string = environment.BE_API_URL + '/liv/authenticate';

  constructor(private http: HttpClient, private router: Router, 
              private alertService: AlertService) {
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
      return  true;
    }
    return false;
  }


  login(loginForm) {
    
    let user=loginForm.user;
    this.http.post(this.urlAuhtenticate, loginForm).subscribe(
        (response:any) => {
          localStorage.setItem('token',response.token)
          localStorage.setItem('user', loginForm.user )
          // this.getlistesUser();
          this.alertService.show('Vous êtes connecté(e)');
          this.getCompteUser();
          this.router.navigate(['/']);
        },
        err => console.log(" pb authenticate - err :" ,err)
    );
  }

// ==> Crer un utilisateur

  postCreationCompte(utilisateurObj: Utilisateur) {

    // le header ci-dessous est renseigné dans apiInterceptor, du moins normalement !!! :)
    // let headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') });
    this.http.post(this.urlBackEnd + '/create', utilisateurObj).subscribe(
      (responseApi: any) => {
        // this.utilisateur$.next(responseApi);
      });
  }
  // ==> obtenir un utilisateur par son user
  getlistesUser() {

    this.http.get(this.urlBackEnd + '/' + this.utilisateur$.getValue().id + '/videolists').subscribe(
        (data: any) => {
              this.mettreAjourListes(data);
        });
  }

  mettreAjourListes(data){
    this.listes$.next(data)
  }

  getCompteUser() {

    this.http.get(this.urlBackEnd + '?user=' + localStorage.getItem('user')).subscribe(
      (response: any) => {    
        this.utilisateur$.next(response);  
        this.getlistesUser() 
      });
  }

}
