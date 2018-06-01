//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '../../model/film';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ListfilmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListfilmsProvider {
  //ejemplo solicitud: https://api.themoviedb.org/3/movie/550?api_key=6036c307d8a1d414e6d7a0bcfde166cf
  private base = 'https://api.themoviedb.org/3/search/movie?';
  private apiKey = '&api_key=6036c307d8a1d414e6d7a0bcfde166cf';
  //https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
  private baseMovie = 'https://api.themoviedb.org/3/search/movie?' + this.apiKey + '&query=';

  constructor(public http: Http) {
  }

  getByTitle(movie: string): Observable<Film[]> {
    return this.http.get(`${this.baseMovie}{movie}=${movie}`)
    .map((response: Response) => this.parseEntities(response))
    .map((respons: any) => <Film>respons)
    .catch((response: Response) => this.error(response));
  }

  getByActor(actor: string): Observable<Film[]> {
    return this.http.get(`${this.base}actor=${actor}`)
    .map((response: Response) => this.parseEntities(response))
    .map((respons: any) => <Film>respons)
    .catch((response: Response) => this.error(response));
  }

  getByDirector(director: string): Observable<Film[]> {
    return this.http.get(`${this.base}director=${director}`)
    .map((response: Response) => this.parseEntities(response))
    .map((respons: any) => <Film>respons)
    .catch((response: Response) => this.error(response));
  }



  private parseEntities(response: Response): Film[] {
    let data = response.json();
    return data;
  }

  // private parseSingleEntity(response: Response): Film[] {
  //   let data = response.json();
  //   return [<Film> data];
  // }

  private error(response: Response) {
    return Observable.of(null);
}
}
