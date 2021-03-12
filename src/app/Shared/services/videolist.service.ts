import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListeSuivis, Suivi, Videolist } from 'src/app/models/liste.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VideolistService {


  private urlBackEnd: string = environment.BE_API_URL + '/liv/videolists/';
  constructor(private http: HttpClient, private router: Router,private userService:UserService) { }

  private dateInit = new Date();
  private videolist:Videolist;

  // public listes$ = new BehaviorSubject([]);


  public listesuivis$ = new BehaviorSubject<ListeSuivis>({
    id: 0,
    name: '',
    dateCreation: this.dateInit,
    dateModification: this.dateInit,
    suivis:  Array<Suivi>()
    });

  getSuivis(listeId: number) {
    this.http.get(this.urlBackEnd + listeId + '/suivis').subscribe(
      (data: ListeSuivis) => {
        this.mettreAjourListeSuiviBehavior(data)
      });

  }
  mettreAjourListeSuiviBehavior(data:ListeSuivis){
    this.listesuivis$.next(data);
  }

  supprimeSuiviDansListeSuiviBehavior(suiviId:number){
    console.log("=========> a terminer !!!!!!!!!!!!!!!!!!!!!!!")
    console.log(this.listesuivis$ )
    console.log(this.listesuivis$.getValue());
    console.log(this.listesuivis$.getValue().suivis )
    console.log(this.listesuivis$.getValue().suivis[1])
    let id=this.listesuivis$.getValue().id;
    let name=this.listesuivis$.getValue().name;
    let dateCreation=this.listesuivis$.getValue().dateCreation
    let dateModification=this.listesuivis$.getValue().dateModification;
    let suivis:Suivi[]=this.listesuivis$.getValue().suivis.filter(data => data.id !=suiviId);
    let listesuiviTemp=new ListeSuivis(id,name,dateCreation,dateModification,suivis)
    this.mettreAjourListeSuiviBehavior(listesuiviTemp)
}
  
  createList(utilisateur:Utilisateur,name: string): void {
    this.videolist=new Videolist(0,name,this.dateInit,this.dateInit);
  
    this.http.put(this.urlBackEnd + utilisateur.id, this.videolist).subscribe(
      (responseApi: Array<Videolist>) => {
        this.userService.mettreAjourListes(responseApi);
          //   this.suiviCreation$.next(data);
        })
    }
    
    
  
}

