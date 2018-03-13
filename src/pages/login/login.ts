  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';
import { RegisterPage } from '../../pages/register/register';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

  animations: [

   //For the logo
   trigger('flyInBottomSlow', [
     state('in', style({
       transform: 'translate3d(0,0,0)'
     })),
     transition('void => *', [
       style({transform: 'translate3d(0,2000px,0'}),
       animate('2000ms ease-in-out')
     ])
   ]),

   //For the background detail
   trigger('flyInBottomFast', [
     state('in', style({
       transform: 'translate3d(0,0,0)'
     })),
     transition('void => *', [
       style({transform: 'translate3d(0,2000px,0)'}),
       animate('1000ms ease-in-out')
     ])
   ]),

   //For the login form
   trigger('bounceInBottom', [
     state('in', style({
       transform: 'translate3d(0,0,0)'
     })),
     transition('void => *', [
       animate('2000ms 200ms ease-in', keyframes([
         style({transform: 'translate3d(0,2000px,0)', offset: 0}),
         style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
         style({transform: 'translate3d(0,0,0)', offset: 1})
       ]))
     ])
   ]),

   //For login button
   trigger('fadeIn', [
     state('in', style({
       opacity: 1
     })),
     transition('void => *', [
       style({opacity: 0}),
       animate('1000ms 2000ms ease-in')
     ])
   ])
 ]
})

export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  loading: Loading;
  registerCredentials = { email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _auth: AuthServiceProvider, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  private pushPage(){
    //this.navCtrl.setRoot(SearchPage);
    this.navCtrl.push(SearchPage);
  }

  public createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  showLoading() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
  });
  this.loading.present();
}

  public login(){
    this.showLoading();
    this._auth.login(this.registerCredentials)
      .subscribe(res => {
        res ? this.pushPage() : this.showError("Acceso denegadoD");
      },
      error => {
        this.showError(error);
      });
  }

  showError(text){
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
     title: 'Fail',
     subTitle: text,
     buttons: ['OK']
   });
   alert.present();
  }

  ionViewDidLoad() {
  }
}
