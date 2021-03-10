import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListeSuivis } from 'src/app/models/liste.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideolistService {

  private urlBackEnd: string = environment.BE_API_URL + '/liv/videolists/';
  constructor(private http: HttpClient, private router: Router,) { }

  private dateInit = new Date();


  public listesuivis$ = new BehaviorSubject<ListeSuivis>({
    id: 0,
    name: '',
    dateCreation: this.dateInit,
    dateModification: this.dateInit,
    suivis: [],
  });

  getSuivis(suiviId: number) {
    this.http.get(this.urlBackEnd + suiviId + '/suivis').subscribe(
      (data: ListeSuivis) => {
        this.listesuivis$.next(data);
      });

  }
}
