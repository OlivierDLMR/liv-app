import {Component, OnInit} from '@angular/core';
import {AlertService} from 'src/app/Shared/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cpuUsage} from 'process';
import {UserService} from 'src/app/Shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private alertService: AlertService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    console.log('==> accountForm.component.ts ngOnInit debut')
    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      user: ['', [Validators.minLength(5), Validators.required]],
      password: ['', [Validators.minLength(8), , Validators.required]]
      // ,acceptTerms: [false, Validators.requiredTrue]
    });
    console.log('==> accountForm.component.ts ngOnInit', this.accountForm)
  }

  get f() {
    return this.accountForm.controls;
  }

  onSubmit(form) {
    console.log(' ===> accout-form.component.ts - onSubmit(form) / form : ', form)
    console.log('form group : ', form.value);
    console.log('accountForm.control', this.accountForm.controls);
    console.log('accountForm.controls.password.errors', this.accountForm.controls.password.errors);

    if (form.status === 'VALID') {
      console.log('Ok valid : on essaie de partir ...');
      this.userService.postCreationCompte(form.value);
      this.alertService.show('compte créé. Merci de vous connecter');
      this.router.navigate(['/login']);
    } else {
      this.submitted = true;
      this.alertService.show('Merci de corriger vos erreurs ');
    }
  }
}
