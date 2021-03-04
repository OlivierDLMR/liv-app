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

import {ListSerieComponent} from './list-serie/list-serie.component';
import {DetailSerieComponent} from './detail-serie/detail-serie.component';
import {MajSuiviComponent} from './majSuivi/maj-suivi/maj-suivi.component';
import {StatutComponent} from './Shared/statut/statut.component';


const routes: Routes = [
  {path: '', component: BoardComponent},
  {path: 'films', component: ListComponent},

  {path: 'series', component: ListSerieComponent},

  {path: 'detail/:id/:type', component: DetailComponent},
  {path: 'detailserie/:id/:type', component: DetailSerieComponent},

  {path: 'login', component: LoginFormComponent},
  {path: 'createAccount', component: AccountFormComponent},
  {path: 'listesNavBar', component: ListesnavbarComponent},
  {path: 'listesuivis/:id/:name', component: ListesuivisComponent},
  {path: 'suivi', component: SuiviComponent},
  {path : 'majSuivi', component: MajSuiviComponent},
  {path: 'statutsuivi', component : StatutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
