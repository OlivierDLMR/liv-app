import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/Shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  accountForm:FormGroup;

  constructor(private fb: FormBuilder,private alertService:AlertService) { }

  ngOnInit(): void {
    console.log("==> accountForm.component.ts ngOnInit debut")
    this.accountForm = this.fb.group({
      firstname:['',Validators.minLength(1)],
      lastname:['',Validators.minLength(1)],
      email: ['', [Validators.email,Validators.required]],
      user:['',[Validators.minLength(5),Validators.required]],
      password:['',Validators.minLength(8)]
    });
    console.log("==> accountForm.component.ts ngOnInit" , this.accountForm)
  }


  onSubmit(form) {
    console.log(" ===> accout-form.component.ts - onSubmit(form) / form : " ,form)
    console.log(form.get('firstname').hasError('minlength'));
    console.log("form group : " ,form.value);
    if (form.status === 'VALID') {
      console.log('Ok valid');
   
    }
    else {
      this.alertService.show('Oups...Corrigez vos erreurs !');
    }
  }
}
