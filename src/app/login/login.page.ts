import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController, MenuController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { UserRoles } from '../user-roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError: any;
  userData: any = [];
  showPasswordText: boolean;

  constructor(public formBuilder: FormBuilder, private route: Router, private toast: ToastController,
    public dataAccess: DataaccesslayerService, public navCtrl: NavController, private loadCtrl: LoadingController,
    private menuCtrl: MenuController, private storage: Storage,
    public events: Events) {
    this.getLogin();
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    console.log("Init login");
  }

  getLogin() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  signUp() {
    this.navCtrl.navigateRoot('/home');
  }

  loginUserCall() {
    this.dataAccess.loginUserCall(this.loginForm.value).then(responseFromLoginCall => {
      this.loginError = responseFromLoginCall['txt'];

      if (responseFromLoginCall['st'] == "success") {
        this.userData = responseFromLoginCall['detail'];
        console.log("UD Login " + JSON.stringify(this.userData));
        this.storage.set("tempUserData", this.userData);
        this.logMeIn(this.userData);
      }
      else {
        this.toastMsg();
      }
    }),
      err => {
        console.log("Error login: " + err);
      }
  }

  async toastMsg() {
    console.log("In toast");
    let toast = await this.toast.create({
      message: this.loginError,
      duration: 3000
    });
    toast.present();
  }

  async logMeIn(value) {
    let loading = await this.loadCtrl.create({
      message: 'Please wait...',
      spinner: "crescent"
    });
    loading.present();

    setTimeout(() => {
      let role;
      let route_Role;
      if (value.type == UserRoles.Student) {
        role = UserRoles.Student;
        route_Role =UserRoles.Student_Routes;
      }
      else if (value.type == UserRoles.Teacher) {
        role = UserRoles.Teacher;
        route_Role =UserRoles.Teacher_Routes;
      }

      let loginData = {
        routing: role,
        sideMenu: route_Role
      };

      this.events.publish('LoginSucess', loginData);
      loading.dismiss();
    }, 1000);
  }

  forgetPassword(){
    console.log("clicked");
    this.navCtrl.navigateForward(['/password-reset']);
  }
}
