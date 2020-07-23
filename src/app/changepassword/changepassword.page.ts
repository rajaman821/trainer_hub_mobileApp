import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../PasswordValidation';
import { Storage } from '@ionic/storage';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { NavController, ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  changePasswordForm: FormGroup;
  userArr = [];

  constructor(public formBuilder: FormBuilder, private storage: Storage,
    private dataAccess: DataaccesslayerService, private navCtrl: NavController, public toast: ToastController,
    private menuCtrl: MenuController) {
    this.initChangePasswordForm();
    this.storage.get("tempUserData").then(response => {
      console.log(response);
      this.userArr = response;
    });
  }

  ngOnInit() {
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: [null, Validators.required],
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

  changePassword() {
    let data = {
      "email": this.userArr['email'],
      "old_password": this.changePasswordForm.value.oldpassword,
      "new_password": this.changePasswordForm.value.password
    };
    console.log("dataval " + JSON.stringify(data));
    let token = this.userArr['token'];
    this.dataAccess.updatePassword(data, token).then(response => {
      if (response['st'] == "success") {
        // this.toastMsg(response['txt']);
        this.navCtrl.navigateRoot(['/login']);
        let msg = response['txt'] + " Please Login again";
        this.toastMsg(msg);
      }
      else {
        this.toastMsg(response['txt']);
      }
    });
  }

  async toastMsg(msg) {
    let toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

}
