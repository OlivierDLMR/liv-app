import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Shared/services/user.service';
import {AlertService} from "../../Shared/services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(public userService:UserService, public alertService : AlertService,  private router: Router) { }

  ngOnInit(): void {
  }
  onLoginSubmit(loginForm) {
    this.userService.login(loginForm.value);
    
  }

  logoutAction(){
    this.userService.logout();
  }
}
