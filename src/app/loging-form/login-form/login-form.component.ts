import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  onLoginSubmit(loginForm) {
    console.log(loginForm.value);
    // this.userService.login(loginForm.value);
    console.log (" ===> login-form-component.ts - onLoginSubmit");
    console.log (      "loginForm.value : ", loginForm.value);
    console.log (      "loginForm.user : ", loginForm.value.user);
    this.userService.getCompteUtilisateur(loginForm.value.user);
    console.log("       ==> retour "  );
  }
}
