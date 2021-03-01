import {Component, OnInit} from '@angular/core';
import {SuivisService} from '../Shared/services/suivis.service';

// import {SuivisService} from "../Shared/services/suivis.service";

@Component({
  selector: 'app-listesnavbar',
  templateUrl: './listesnavbar.component.html',
  styleUrls: ['./listesnavbar.component.scss']
})
export class ListesnavbarComponent implements OnInit {

  constructor(private suivisService: SuivisService) {
  }

  ngOnInit(): void {
    // this.suivisService.getListesSuivis();

  }

}
