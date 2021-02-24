import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router:Router,private alertService: AlertService) { }

  logout(){
    localStorage.clear()
    this.router.navigate(['login']);
    this.alertService.show('Vous êtes déconnecté');
  }
isLogged():boolean{
  if (localStorage.getItem('token')){
    return true;
  }
  return false;
}
}
