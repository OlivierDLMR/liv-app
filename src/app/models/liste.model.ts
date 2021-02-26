export interface ListesNavBar extends Array<ListeSuivis>{


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
  dernierEpisodeVu;
}

export interface Preview {
  id: number;
  idMovieDb: string;
  titre: string;
  image: string;
  dateCreation: Date;
  overview: string;
  typePreview: TypePreview;
}

export enum Statut {
  onGoing = 'EN_COURS',
  notSeen = 'PAS_VU',
  finished = 'FINI',
  abort = 'ABANDONNE',
}

export enum TypePreview {
  FILM = 'FILM',
  SERIE = 'SERIE',
}
