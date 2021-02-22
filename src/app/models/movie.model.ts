



export class MovieModel {
    id: number;
    title: string;
    desc: string;
    image: string;
    date: Date;
    score: number;
    video: string;
    constructor(id, title, overview, backdrop, release_date, vote_average, key ){
        this.id = id;
        this.title = title;
        this.desc = overview;
        this.image = backdrop;
        this.date = new Date(release_date);
        this.score = vote_average;
        this.video = key;
    }
}