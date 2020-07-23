import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { debug } from 'util';

@Component({
  selector: 'app-teacherloggedin',
  templateUrl: './teacherloggedin.page.html',
  styleUrls: ['./teacherloggedin.page.scss'],
})
export class TeacherloggedinPage implements OnInit {

  userArr: any = [];
  getSkills: any = [];

  constructor(public navCtrl: NavController, public storage: Storage, public datacesslayer: DataaccesslayerService,
    public alertController: AlertController, public menuCtrl: MenuController, public router: Router, private geolocation: Geolocation) {

    this.menuCtrl.enable(true);
    this.storage.get("tempUserData").then(res => {
      this.userArr = res;
      this.getTeacherSkills(res);
      this.geolocate(res);
    });
  }

  geolocate(val) {

    this.geolocation.getCurrentPosition().then((resp) => {
      let lat = resp.coords.latitude;
      let long = resp.coords.longitude;
      console.log(lat);
      console.log(long);
      let locationData = {
        "type": val['type'],
        "email": val['email'],
        "lat": lat,
        "long": long,
      };
      let token = val['token'];
      this.datacesslayer.updateLocation(locationData, token).then(response => {
        console.log(JSON.stringify(response));
      });
    }).catch((error) => {
      console.log('Error getting location', error);

    });

  }

  getTeacherSkills(res) {
    let getSkillData = {
      "teacher_id": res['id'],
      "email": res['email'],
    };
    let token = res['token'];
    this.datacesslayer.getSkill(getSkillData, token).then(res => {
      console.log(JSON.stringify(res));
      this.getSkills = res['detail'];
      console.log(this.getSkills);
    });

  }


  addskil() {
    this.navCtrl.navigateForward('/teacheraddskill');
  }

  deleteSkill(skillId) {
    this.presentAlertConfirm(skillId);
  }

  async presentAlertConfirm(skillId) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Do You want to Delete!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.delSkil(this.userArr, skillId);
          }
        }
      ]
    });
    await alert.present();
  }

  delSkil(val, skillId) {
    let deleteData = {
      "email": val['email'],
      "skill_id": skillId,
    };
    let token = val['token'];
    this.datacesslayer.deleteSkill(deleteData, token).then(res1 => {
      console.log(JSON.stringify(res1));
      this.getTeacherSkills(this.userArr);
    });
  }

  ionViewDidLoad() {
    console.log("Did Load");
  }

  ionViewWillEnter() {
    console.log("Will Enter");
    this.getTeacherSkills(this.userArr);
  }

  ionViewDidEnter() {
    console.log("Did Load");
  }

  ionViewWillLeave() {
    console.log("Will leave");
  }

  ionViewDidLeave() {
    console.log("Did Leave");
  }

  ionViewWillUnload() {
    console.log("UNload");
  }

  ngOnInit() {
  }

}
