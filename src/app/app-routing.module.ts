import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountFormComponent } from './account-form/account-form/account-form.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { LoginFormComponent } from './loging-form/login-form/login-form.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'detail/:id/:type', component: DetailComponent },
  { path: 'login', component:LoginFormComponent},
  { path:'createAccount', component:AccountFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
