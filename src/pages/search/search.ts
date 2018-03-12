import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListfilmsProvider } from '../../providers/listfilms/listfilms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../../pages/login/login';
import { Film } from '../../model/film';
import { FilmPage } from "../film/film";


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage{
  @ViewChild('searchField')
  //Output es entre componentes
  @Output() checkfilm: EventEmitter<Film[]> = new EventEmitter<Film[]>();
  listF: any = {};
  username = '';
  email = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _listfilms: ListfilmsProvider, public _auth: AuthServiceProvider) {
      let info = this._auth.getUserInfo();
      this.username = info['name'];
      this.email = info['email'];
  }

  ionViewDidLoad() {
  }

  getItems(input: string){
    console.log("llegamos");
    //debugger;
    this._listfilms.getByTitle(input).subscribe(
    (result:any) => { this.listF = result; });
  }

  showFilm(film:Film){
    this.navCtrl.push(FilmPage,{
      film:film
    });
}

  public logout() {
    this._auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

}
