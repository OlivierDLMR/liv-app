import {Component, OnInit} from '@angular/core';
import {AlertService} from 'src/app/Shared/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cpuUsage} from 'process';
import {UserService} from 'src/app/Shared/services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  submitted: boolean = false;

  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      user: ['', [Validators.minLength(5), Validators.required]],
      password: ['', [Validators.minLength(8), , Validators.required]]
      // ,acceptTerms: [false, Validators.requiredTrue]
    });

  }

  get f() {
    return this.accountForm.controls;
  }

  onSubmit(form) {
    

    if (form.status === 'VALID') {
      this.userService.postCreationCompte(form.value);
      this.alertService.show('compte créé. Merci de vous connecter');
      this.router.navigate(['/login']);
    } else {
      this.submitted = true;
      this.alertService.show('Merci de corriger vos erreurs ');
    }
  }
}
