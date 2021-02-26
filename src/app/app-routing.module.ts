import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountFormComponent} from './account-form/account-form/account-form.component';
import {DetailComponent} from './detail/detail.component';
import {ListComponent} from './list/list.component';
import {LoginFormComponent} from './loging-form/login-form/login-form.component';
import {ListesnavbarComponent} from './listesnavbar/listesnavbar.component';
import {SuiviComponent} from './suivi/suivi.component';
import {ListesuivisComponent} from './listesuivis/listesuivis.component';
import {BoardComponent} from './board/board.component';

const routes: Routes = [
  {path: '', component: BoardComponent},
  {path: 'films', component: ListComponent},
  {path: 'detail/:id/:type', component: DetailComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'createAccount', component: AccountFormComponent},
  {path: 'listesNavBar', component: ListesnavbarComponent},
  {path: 'listesuivis', component: ListesuivisComponent},
  {path: 'suivi', component: SuiviComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
