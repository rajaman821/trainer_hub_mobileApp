import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, MenuController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../PasswordValidation';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  public show = true;
  public show2 = false;
  resetForm: FormGroup;

  constructor(private toast: ToastController, private dataAccess: DataaccesslayerService,
    public formBuilder: FormBuilder, private navCtrl: NavController, private menuCtrl: MenuController) {

    this.initResetFrom();
  }

  ngOnInit() {
  }

  initResetFrom() {
    this.resetForm = this.formBuilder.group({
      email: [null],
      code: [null],
      password: [, [Validators.required, this.noWhitespaceValidator, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmpassword: [, [Validators.required, this.noWhitespaceValidator, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }

  noWhitespaceValidator(control: FormControl) {
    console.log("in white space");
    var count = 0;
    let isValid: boolean;
    let string = (control.value);
    console.log("String " + string);
    if (string == null) {
      console.log("empty");
    }
    else {
      let strNew = string.trim();
      console.log("newStr " + strNew);
      for (var i = 0; i < strNew.length; i++) {
        if (strNew[i] == " ") {
          count++;
        }
      }
      console.log("WS" + count);
      if (count == 0) {
        isValid = true;
        return isValid ? null : { 'whitespace': false }
      }
      else {
        isValid = false;
        return isValid ? null : { 'whitespace': true }
      }
    }
  }

  confirmEmail() {
    let email = this.resetForm.value.email;
    if (email == null) {
      console.log("email is null");
    }
    else {
      console.log(email);
      this.dataAccess.forgotPassword(email).then(response => {
        console.log("CE " + JSON.stringify(response));
        if (response['st'] == "success") {
          this.show = false;
          this.show2 = true;
        }
        else {
          this.toastMsg(response['txt']);
        }
      });
    }
  }

  sendCode() {
    let code = this.resetForm.value.code;
    let email = this.resetForm.value.email;
    console.log(email + " " + code);
    if (code == null) {
      console.log("code is null");
    }
    else {
      this.dataAccess.verifyCode(email, code).then(response => {
        console.log("SC " + JSON.stringify(response));
        if (response['st'] == "success") {
          this.show2 = false;
        }
        else {
          this.toastMsg(response['txt']);
        }
      });
    }
  }

  resetPassword() {
    let email = this.resetForm.value.email;
    let password = this.resetForm.value.password;
    if (password == null) {
      console.log("Password can't be empty");
    }
    else {
      this.dataAccess.resetPassword(email, password).then(response => {
        console.log("RP " + JSON.stringify(response));
        if (response['st'] == "success") {
          let msg = "Password changed successfully";
          this.toastMsg(msg);
          this.navCtrl.navigateRoot(['/login']);
        }
        else {
          this.toastMsg(response['txt']);
        }
      });
    }
  }

  async toastMsg(msg) {
    console.log("In toast");
    let toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
}
