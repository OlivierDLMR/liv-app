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
    this.accountForm = this.fb.group({
      firstname:['',Validators.minLength(2)],
      lastname:['',Validators.minLength(2)],
      email: ['', Validators.email],
      user:['',Validators.minLength(2)],
      password:['',Validators.minLength(8)]
    });
    console.log("accountForm.component.ts ngOnInit" , this.accountForm)
  }


  onSubmit(form) {
    console.log(form)
    console.log(form.get('first').hasError('minlength'));
    console.log(form.value);
    if (form.status === 'VALID') {
      console.log('Ok valid');
   
    }
    else {
      this.alertService.show('Oups...Corrigez vos erreurs !');
    }
  }
}
