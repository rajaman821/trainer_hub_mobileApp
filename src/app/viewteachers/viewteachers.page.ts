import { Component, OnInit } from '@angular/core';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TeacherdetailsPage } from '../teacherdetails/teacherdetails.page';

@Component({
  selector: 'app-viewteachers',
  templateUrl: './viewteachers.page.html',
  styleUrls: ['./viewteachers.page.scss'],
})
export class ViewteachersPage implements OnInit {
  userData = [];

  constructor(private dataAccess: DataaccesslayerService, private menuCtrl: MenuController, public modalCtrl: ModalController,
    private storage: Storage) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    let strArr = [];
    this.storage.get("localData").then(res => {
      console.log("Res is " + JSON.stringify(res));
      strArr = res;
      this.getTeachers(strArr);
    });
  }

  getTeachers(value) {

    let data = {
      "email": value['email'],
      "ticket_id": value['ticket_id'],
      "tution_type": value['tution_type']
    };

    let token = value['token'];
    this.dataAccess.getTeachers(data, token).then(responseFromTeacherCall => {
      if (responseFromTeacherCall['st'] == "success") {
        this.userData = responseFromTeacherCall['detail'];
      }
    });
  }

  ionViewDidLeave() {
    console.log("Did Leave2");
    this.dataAccess.storage.remove("localData");
  }

  async getTeacherDetails(id) {
    console.log(id);
    const modal = await this.modalCtrl.create({
      component: TeacherdetailsPage,
      componentProps: {
        id: id
      }
    });

    return await modal.present();
  }


}
