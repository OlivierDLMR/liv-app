import { Component, OnInit } from '@angular/core';
import { UserService } from './Shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'liv-app';
  loader:boolean = false;


  constructor(public userService: UserService) {
    console.log(this);
  }

  ngOnInit(){
    console.log('==> appComonent ngOnInit !!!');
  }
}
