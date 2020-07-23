import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Router } from '@angular/router';
import { NavController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edituserinfo',
  templateUrl: './edituserinfo.page.html',
  styleUrls: ['./edituserinfo.page.scss'],
})
export class EdituserinfoPage implements OnInit {

  userData = [];
  editInfoForm: FormGroup;
  profileData: any = [];
  token: DoubleRange;
  imageUrl: string;

  constructor(private storage: Storage, public formBuilder: FormBuilder, private dataAccess: DataaccesslayerService,
    private menuCtrl: MenuController, public modalCtrl: ModalController) {

    //this.menuCtrl.enable(true);
    this.initEditForm1();
    this.storage.get("tempUserData").then(res => {
      this.userData = res;
      this.initEditForm(this.userData);
      console.log("resp: " + JSON.stringify(res));
      console.log("EditPage " + JSON.stringify(this.userData));
    });
  }

  initEditForm1() {

    this.editInfoForm = this.formBuilder.group({
      fullname: [null],
      gender: [null],
      phone: [null],
      email: [null],
      state: [null],
      city: [null]
    });
  }

  initEditForm(value) {

    this.token = value.token;
    console.log("tokenval " + this.token);
    this.editInfoForm = this.formBuilder.group({
      fullname: [value.fullName, [Validators.minLength(4), Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator]],
      gender: [value.gender],
      phone: [value.phone],
      email: [value.email],
      state: [value.state],
      city: [value.city, [Validators.pattern('[a-zA-Z]*'), this.noWhitespaceValidator]]
    });
  }

  noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  editUser() {

    let profileData = {
      "name": this.editInfoForm.value.fullname.trim(),
      "city": this.editInfoForm.value.city.trim(),
      "type": this.userData['type'],
      "email": this.editInfoForm.value.email
    };

    console.log("Value of profData " + JSON.stringify(profileData));
    console.log("token val before call " + this.token);

    this.dataAccess.editProfile(profileData, this.token).then(responseFromEditProfile => {
      //  console.log("prof resp "+ JSON.stringify(responseFromEditProfile));
      debugger;
      if (responseFromEditProfile['st'] == "success") {
        console.log("updated successfully");
        console.log(JSON.stringify(responseFromEditProfile['detail']));
        this.profileData = responseFromEditProfile['detail'];
        console.log("this.Profdata " + JSON.stringify(this.profileData));
        this.storage.set("tempUserData", this.profileData);
        console.log("saved");
        this.modalCtrl.dismiss(responseFromEditProfile['detail']);

      }
      else {
        console.log("error updating");
        let err = responseFromEditProfile['txt'];
        alert(err);
      }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

}
