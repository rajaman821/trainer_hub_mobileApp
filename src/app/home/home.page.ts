import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from '../PasswordValidation';
import { ToastController, NavController, MenuController, LoadingController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { CommonCode } from '../reuse-code/common-code';
import { Storage } from '@ionic/storage';
import { UserRoles } from '../user-roles.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends CommonCode {

  signupForm: FormGroup;
  responsePasswordMatching: string;
  statesList: any;
  passwordFlag: boolean;

  constructor(public formBuilder: FormBuilder,
    public route: Router, private toast: ToastController,
    public dataAccess: DataaccesslayerService,
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    public storage: Storage,
    public loadCtrl: LoadingController,
  ) {
    super(storage, route, navCtrl, loadCtrl)
    this.getSignup();
    this.menuCtrl.enable(false);
    this.getStatesList();
  }

  loginUser() {

    super.navigationMethod(UserRoles.Nouser);
  }

  getSignup() {

    this.signupForm = this.formBuilder.group({
      fullname: [null, [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      gender: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern('^([7-9][0-9]{9})$')]],
      state: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: [, [Validators.required, this.noWhitespaceValidator, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmpassword: [, [Validators.required, this.noWhitespaceValidator, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
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

  registerUser(type) {
    console.log("type " + type);
    console.log("form val" + JSON.stringify(this.signupForm.value));

    let signupObj = {
      "fullName": this.signupForm.value.fullname.trim(),
      "gender": this.signupForm.value.gender,
      "email": this.signupForm.value.email.trim(),
      "state": this.signupForm.value.state,
      "phone": this.signupForm.value.phone,
      "password": this.signupForm.value.password.trim()
    };

    if (type == "student") {

      console.log(this.signupForm.value);

      this.dataAccess.registerStudentCall(signupObj).then(responseFromStudentRegister => {
        console.log("Reg Student Home: " + JSON.stringify(responseFromStudentRegister));
        if (responseFromStudentRegister['st'] == "success") {
          console.log("sts if:" + responseFromStudentRegister['st']);
          console.log("Ready for Login");
          this.navCtrl.navigateRoot(['./login']);
          this.toastLogin();
        } else {
          this.toastMsg(responseFromStudentRegister['txt']);
        }
      },
        err => {
          console.log("Error reg user home: " + err);
        }
      );
    }

    else {
      this.dataAccess.registerTeacherCall(signupObj).then(responseFromTeacherRegister => {
        console.log("Reg teacher Home: " + JSON.stringify(responseFromTeacherRegister));
        if (responseFromTeacherRegister['st'] == "success") {
          console.log("sts else:" + responseFromTeacherRegister['st']);
          console.log("Ready for Login");
          this.navCtrl.navigateRoot(['/login']);
          this.toastLogin();
        }
        else {
          console.log("sts if:" + responseFromTeacherRegister['st']);
          console.log("Error Found");
          this.toastMsg(responseFromTeacherRegister['txt']);
        }

      }, // end of registerTeacher

        err => {
          console.log("Error reg user home: " + err);
        }
      );
    }
  }

  async toastMsg(msg) {
    console.log("In toast");
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async toastLogin() {
    let toast = await this.toast.create({
      message: "Successfully registered! Please Login Now.",
      duration: 3000
    });
    toast.present();
  }

  getStatesList() {
    this.dataAccess.getStatesList().then(responseFromStateCall => {
      this.statesList = responseFromStateCall['data'];
    });
  }

  ngOnInit() {
    console.log("Init Home");
  }
}