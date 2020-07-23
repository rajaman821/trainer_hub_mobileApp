import { Component, OnInit, Input } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { JsonPipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-teacherdetails',
  templateUrl: './teacherdetails.page.html',
  styleUrls: ['./teacherdetails.page.scss'],
})
export class TeacherdetailsPage implements OnInit {

  @Input() id: any;
  teacherArr: any = [];


  constructor(private modalCtrl: ModalController, private storage: Storage,
    private dataAccess: DataaccesslayerService, private callNumber: CallNumber, private menuCtrl: MenuController) {
    this.storage.get("tempUserData").then(res => {
      let token = res['token'];
      let email = res['email'];
      this.getTeacherDetails(email, token);
    });
  }

  ngOnInit() {
    console.log(this.id);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getTeacherDetails(email, token) {
    let data = {
      "email": email,
      "teacherId": this.id
    };

    this.dataAccess.getTeacherInfo(data, token).then(response => {
      console.log("Resp from get " + JSON.stringify(response));
      if (response['st'] == "success") {
        this.teacherArr = response['detail'];
      }
    });
  }

  callTeacher(phone) {
    console.log(phone);
    this.callNumber.callNumber(phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

}
