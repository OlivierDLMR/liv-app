import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './models/utilisateur.model';
import { UserService } from './Shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  // variables d'affichage 
  title = 'liv-app';
  loader:boolean = false;
  utilisateur:Utilisateur;


  constructor(public userService: UserService) {
    console.log(this);
  }

  ngOnInit(){
    console.log('==> appComonent ngOnInit !!!');
    this.userService.utilisateur$.subscribe(data => {
      this.utilisateur=data;
    })
  }

  logoutAction(){
    this.userService.logout();
  }
}
