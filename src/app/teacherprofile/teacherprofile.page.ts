import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { TeachereditprofilePage } from '../teachereditprofile/teachereditprofile.page';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.page.html',
  styleUrls: ['./teacherprofile.page.scss'],
})
export class TeacherprofilePage implements OnInit {

  userArr: any;
  base64Image: any;
  baseImage: any;
  image: any;
  teacherForm: FormGroup;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController,
    public storage: Storage, public datacesslayer: DataaccesslayerService, private camera: Camera,
    public actionSheetController: ActionSheetController, public modalCtrl: ModalController,
    public formBuilder: FormBuilder) {

    this.menuCtrl.enable(false);
    this.initEditForm1();
    this.getData();
  }

  getData() {
    this.storage.get("tempUserData").then(res => {

      console.log(res);
      this.userArr = res;
      if (this.userArr['Image'] == null || this.userArr['Image'] == undefined) {
        this.base64Image = 'http://trainerhub.trainingncr.info/assets/img/profile_image/teacher.png';
      }
      else {

        this.baseImage = new String("http://trainerhub.trainingncr.info/");
        this.image = res['Image'];
        this.base64Image = this.baseImage.concat(this.image);
        console.log(this.image);
      }
      console.log(this.userArr);
      this.initEditForm(this.userArr);
    });
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.sendImageToDb(this.base64Image);
    }, (err) => {
      alert("Error " + err);
    });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //  this.photos.push(this.base64Image);
      //  this.photos.reverse();
      alert(imageData);
      alert(JSON.stringify(imageData));
      this.sendImageToDb(imageData);
    }, (err) => {
      console.log(err);
    });

  }

  initEditForm1() {
    this.teacherForm = this.formBuilder.group({
      fullname: [null],
      gender: [null],
      phone: [null],
      email: [null],
      state: [null],
      city: [null],
      radius: [null],
      TypeTutionId: [null]
    });
  }

  initEditForm(value) {
    this.teacherForm = this.formBuilder.group({
      fullname: [value.fullName],
      gender: [value.gender],
      phone: [value.phone],
      email: [value.email],
      state: [value.state],
      city: [value.city],
      radius: [value.radius],
      TypeTutionId: [value.TypeTutionId]
    });
  }

  sendImageToDb(imageValue) {
    let formData = new FormData();
    formData.append('type', this.userArr['type'])
    formData.append('email', this.userArr['email'])
    formData.append('image', imageValue)
    this.datacesslayer.uploadImage(formData, this.userArr['token']).then(response => {
      alert(JSON.stringify(response));
      if (response['st'] == "success") {
        let newStorage = {

          "Image": imageValue,
          "TypeTutionId": this.userArr['TypeTutionId'],
          "city": this.userArr['city'],
          "email": this.userArr['email'],
          "fullName": this.userArr['fullName'],
          "gender": this.userArr['gender'],
          "id": this.userArr['id'],
          "phone": this.userArr['phone'],
          "state": this.userArr['state'],
          "token": this.userArr['token'],
          "radius": this.userArr['radius'],
          "type": this.userArr['type'],

        }
        this.storage.set("tempUserData", newStorage);

      }
    });
  }

  async editInfo() {
    console.log("In modal");
    debugger;
    const modal = await this.modalCtrl.create({
      component: TeachereditprofilePage,
    });
    modal.onDidDismiss().then(res => {
      if (res.data != undefined) {
        this.getData();
      }
    });
    return await modal.present();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log('Share clicked');
          this.openCamera();
        }
      }, {
        text: 'Gallery',
        icon: 'photos',
        handler: () => {
          console.log('Play clicked');
          this.openGallery();
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  editPass() {
    this.navCtrl.navigateForward(['/changepassword']);
  }

  ngOnInit() {
  }
}
