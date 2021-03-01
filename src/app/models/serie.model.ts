
export class SerieModel {
    id: number;
    title: string;
    desc: string;
    image: string;
    date: Date;
    score: number;
    video: string;
    constructor(id, name, overview, backdrop, first_air_date, vote_average, key ){
        this.id = id;
        this.title = name;
        this.desc = overview;
        this.image = backdrop;
        this.date = new Date(first_air_date);
        this.score = vote_average;
        this.video = key;
    }
}
