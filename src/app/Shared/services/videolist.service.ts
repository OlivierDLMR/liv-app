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
    // this.listesuivis$.next(
    //   this.listesuivis$.getValue().suivis.filter(data => data.id != suiviId)   )}
     
      // suivis.filter((suiviASupprimer:any) => suiviId);


    //     this.listesuivis$.getValue().suivis.filter((suiviASupprimer:any)=> suiviASupprimer.id !=suivi.id)
    //     );
      // suppression du contact dans contacts$
  //     this.contacts$.next(
  //       this.contacts$.getValue().filter((contact: any) => contact.id != contactId)
  // 
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

