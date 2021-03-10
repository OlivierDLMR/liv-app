import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListeSuivis, Videolist } from 'src/app/models/liste.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VideolistService {
  userService:UserService;
  private urlBackEnd: string = environment.BE_API_URL + '/liv/videolists/';
  constructor(private http: HttpClient, private router: Router,) { }

  private dateInit = new Date();
  private videolist:Videolist;

  public listes$ = new BehaviorSubject([]);


  public listesuivis$ = new BehaviorSubject<ListeSuivis>({
    id: 0,
    name: '',
    dateCreation: this.dateInit,
    dateModification: this.dateInit,
    suivis: [],
  });

  getSuivis(listeId: number) {
    this.http.get(this.urlBackEnd + listeId + '/suivis').subscribe(
      (data: ListeSuivis) => {
        this.listesuivis$.next(data);
      });

  }

  createList(utilisateur:Utilisateur,name: string): void {
    this.videolist=new Videolist(0,name,this.dateInit,this.dateInit);
    console.log("===> " ,this.videolist);
    console.log("===> " ,this.videolist);
    console.log("===> utilisateurId : " ,utilisateur);

    this.http.put(this.urlBackEnd + utilisateur.id, this.videolist).subscribe(
      (data: any) => {
        console.log("retour creation liste : ", data);
       // this.suiviCreation$.next(data);
      }
    );
    console.log('createList');
  }
}
