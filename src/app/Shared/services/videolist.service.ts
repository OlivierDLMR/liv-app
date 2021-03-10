import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListeSuivis, Videolist } from 'src/app/models/liste.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideolistService {

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

  createList(utilisateurId:number,name: string): void {
    this.videolist=new Videolist(0,name,this.dateInit,this.dateInit);
    console.log("===> " ,this.videolist);
    console.log("===> " ,this.videolist);
    console.log("===> utilisateurId : " ,utilisateurId);
    this.http.put(this.urlBackEnd + utilisateurId +'/', this.videolist).subscribe(
      (data: any) => {
        console.log("retour creation liste : ", data)
       // this.suiviCreation$.next(data);
      }
    );
    console.log('createList');
  }
}
