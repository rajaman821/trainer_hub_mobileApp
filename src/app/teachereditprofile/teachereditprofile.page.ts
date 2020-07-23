import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-teachereditprofile',
  templateUrl: './teachereditprofile.page.html',
  styleUrls: ['./teachereditprofile.page.scss'],
})
export class TeachereditprofilePage implements OnInit {

  myForm: FormGroup;
  userArr: any = [];
  token: any;

  constructor(public menuCtrl: MenuController,
    public storage: Storage,
    public navCtrl: NavController,
    public datacesslayer: DataaccesslayerService,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController) {

    this.storage.get("tempUserData").then(res => {
      this.userArr = res;
      console.log(this.userArr);
      this.initEditInfo(this.userArr);
    });
    this.profile();
  }

  profile() {
    this.myForm = this.formBuilder.group({
      fullName: [],
      gender: [],
      email: [],
      city: [],
      state: [],
      phone: [],
      type: [],
      radius: [],
      tuitionType: []
    });
  }
  initEditInfo(value) {

    this.token = value['token'];
    console.log(this.token);
    this.myForm = this.formBuilder.group({

      fullName: [value.fullName, [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      gender: [value.gender],
      email: [value.email],
      city: [value.city, [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      state: [value.state],
      phone: [value.phone],
      type: [value.type],
      radius: [value.radius],
      tuitionType: [value.TypeTutionId]
    });
  }

  sendDetails() {

    let editProfileData = {
      "name": this.myForm.value.fullName,
      "city": this.myForm.value.city,
      "state": this.myForm.value.state,
      "type": this.myForm.value.type,
      "email": this.myForm.value.email,
      "radius": this.myForm.value.radius,
      "tuitionType": this.myForm.value.tuitionType
    };

    this.datacesslayer.profileEdit(editProfileData, this.token).then(res => {
      console.log(JSON.stringify(res));
      if (res['st'] == "success") {
        let object = res['detail'];
        this.storage.set("tempUserData", object);
        this.modalCtrl.dismiss(res['detail']);
      }
      else {
        console.log("error updating");
        let err = res['txt'];
        alert(err);
      }
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

}
