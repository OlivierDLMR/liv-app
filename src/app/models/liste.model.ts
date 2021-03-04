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
}

export interface SuiviCreation {
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
 EN_COURS = "en cours",
 A_VOIR = "à voir",
 VU = 'terminé',
 ABANDONNE = "abandonné",
  // onGoing = 'EN_COURS',
  // notSeen = 'A_VOIR',
  // finished = 'VU',
  // abort = 'ABANDONNE',
}

export enum TypePreview {
  SERIE = "Série",
  FILM = "Film",

}
