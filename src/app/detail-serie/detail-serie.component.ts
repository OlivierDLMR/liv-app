import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {SerieService} from '../Shared/services/serie.service';
import {SerieModel} from '../models/serie.model';
import {Subscription} from "rxjs";
import { UserService } from '../Shared/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail-serie.component.html',
  styleUrls: ['./detail-serie.component.scss']
})
export class DetailSerieComponent implements OnInit {
  /*
    injecter un objet de la class ActivatedRoute
    permet de récupérer le paramètre id de l'url
    ** avec .snapshot.params.id
  */
  serieId: number;
  type: string;
  serie: SerieModel;
  urlYTSerie: any;

  subscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private serieService: SerieService,
    private router: Router,
    private sanitizer: DomSanitizer,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {

    // 1 recuperer l'ID du film ET le type ('serie', ou 'results')
    this.serieId = this.route.snapshot.params.id;
    this.type = this.route.snapshot.params.type;

    console.log('ids : ' + this.serieId);
    if (this.type == 'series') {
      // 2 récupérer les informations de la serie
      this.serie = this.serieService.series$.getValue()
        .find(serie => serie.id == this.serieId);
    } else {
      // 2 récupérer les informations de la serie
      this.serie = this.serieService.search$.getValue()
        .find(serie => serie.id == this.serieId);
    }
    console.log('detail serie .' + this.serie);

    this.subscription = this.serieService
      .getSerieInfo(this.serieId)
      .subscribe((data: any) => {
        this.urlYTSerie =
          this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.results[0].key);
      });


  } // fin ngOnInit()


  goToRootPage() {
    this.serieService.search$.next([]);
    this.router.navigate(['/series']);
  }

  printImageSrc(serie: SerieModel): string {
    return 'https://image.tmdb.org/t/p/w500' + serie.image;
  }

  computeBackgroundStyle(image: string): string {
    return `url("https://image.tmdb.org/t/p/w500${image}")`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
