export interface ListesNavBar extends Array<Videolist> {

}

export interface Videolist {
  id: number;
  name: string;
  dateCreation: Date;
  dateModif: Date;
}

export interface ListeSuivis {
  id: number;
  titre: string;
  dateCreation: Date;
  dateModification: Date;
  suivis: Array<Suivi>;
}

export interface Suivi {
  id: number;
  preview: Preview;
  statut: Statut;
  noteUser: number;
  saisonEnCours: number;
  dernierEpisodeVu: number;
  isUpdatable:boolean;
}

export class SuiviCreation {
  dbMovieId: number;
  image: string;
  noteUser: number;
  overview: string;
  statut: Statut;
  titre: string;
  totalSaison: number;
  typePreview: TypePreview;
  userId: number;
  videoListId: number;

  constructor(dbMovieId: number, image: string, noteUser: number, overview: string,
              status: Statut, titre: string, totalSaison: number,
              typePreview: TypePreview, userId: number, videoListId: number) {
    this.dbMovieId = dbMovieId;
    this.image = image;
    this.noteUser = noteUser;
    this.overview = overview;
    this.statut = this.statut;
    this.titre = titre;
    this.totalSaison = totalSaison;
    this.typePreview = typePreview;
    this.userId = userId;
    this.videoListId = videoListId;
  }
}


export interface Preview {
  id: number;
  idMovieDb: number;
  titre: string;
  image: string;
  dateCreation: Date;
  overview: string;
  typePreview: TypePreview;
}

export enum Statut {
  EN_COURS = "EN_COURS",
  A_VOIR = "A_VOIR",
  VU = 'VU',
  ABANDONNE = "ABANDONNE",
  // onGoing = 'EN_COURS',
  // notSeen = 'A_VOIR',
  // finished = 'VU',
  // abort = 'ABANDONNE',
}

export enum TypePreview {
  SERIE = "SERIE",
  FILM = "FILM",

}
