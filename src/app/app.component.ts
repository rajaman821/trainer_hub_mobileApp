import { Component } from '@angular/core';
import { Platform, LoadingController, NavController, Events, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserRoles } from './user-roles.enum';
import { CommonCode } from './reuse-code/common-code';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent extends CommonCode {

  appPages: { roles: UserRoles; title: string; url?: string; icon: string; }[];
  public counter = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public Route: Router,
    public navCtrl: NavController,
    public events: Events,
    private toastCtrl: ToastController
  ) {
    super(storage, Route, navCtrl, loadCtrl)
    events.subscribe('LoginSucess', (value) => {
      debugger;
      this.appPages = super.setSideMenuRoutesMethod(value.sideMenu);
      super.navigationMethod(value.routing);
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.checkingLoggedIn();
    this.backbuttonSubscribeMethod();

  }

  checkingLoggedIn() {
    debugger;
    this.storage.get('tempUserData').then(res => {
      if (res == null) {
        super.navigationMethod(UserRoles.Nouser);
      }
      else if (res != null && res.type == UserRoles.Teacher) {
        this.appPages = super.setSideMenuRoutesMethod(UserRoles.Teacher_Routes);
        super.navigationMethod(UserRoles.Teacher);
      }
      else if (res != null && res.type == UserRoles.Student) {
        this.appPages = super.setSideMenuRoutesMethod(UserRoles.Student_Routes);
        super.navigationMethod(UserRoles.Student);
      }
    })
  }


  backbuttonSubscribeMethod() {
    this.platform.backButton.subscribe(() => {
      if (this.route.url === '/login' || this.route.url == '/teacherloggedin' || this.route.url == '/loggedinuser') {
        navigator['app'].exitApp();
      }
    });
  }

  navigation(url, roles) {
    this.appPages;
    if (roles != 0) {
      this.navCtrl.navigateForward(url);
    }
    else {
      super.logOut();
    }
  }

  async confirmExit() {
    let toast = await this.toastCtrl.create({
      message: "Press again to close the app",
      duration: 3000
    });
    toast.present();
  }
}
