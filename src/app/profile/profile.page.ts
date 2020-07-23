import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EdituserinfoPage } from '../edituserinfo/edituserinfo.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataaccesslayerService } from '../dataaccesslayer.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userProfileObj: any;
  editingData: boolean;
  profileForm: FormGroup;
  userData = [];
  imageUrl: any;

  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController, public modalCtrl: ModalController,
    public storage: Storage, private route: Router, public formBuilder: FormBuilder,
    private dataAccess: DataaccesslayerService, private actionCtrl: ActionSheetController, private camera: Camera,
    public toast: ToastController) {

    //this.menuCtrl.enable(true);
    console.log("in Proifle page");
    this.editingData = true;
    this.initEditForm1();
    this.storage.get("tempUserData").then(res => {
      this.userData = res;
      if (this.userData['Image'] != "") {
        console.log("1");
        let baseURL = 'http://trainerhub.trainingncr.info/';
        let image = this.userData['Image'];
        this.imageUrl = baseURL.concat(image);
        console.log("imageUrl1:" + this.imageUrl);
        console.log("a");
      } else {
        console.log("2");
        let baseURL = 'http://trainerhub.trainingncr.info/';
        let image = 'assets/img/student.png';
        this.imageUrl = baseURL.concat(image);
        console.log("imageUrl2:" + this.imageUrl);
        console.log("b");

      }
      this.initEditForm(this.userData);
      console.log("resp: " + JSON.stringify(res));
      console.log("EditPage " + JSON.stringify(this.userData));
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  // ionViewWillEnter() {
  //   // console.log('hi')
  //   // this.menuCtrl.enable(true);
  // }

  initEditForm1() {
    this.profileForm = this.formBuilder.group({
      fullname: [null],
      gender: [null],
      phone: [null],
      email: [null],
      state: [null],
      city: [null]
    });
  }

  initEditForm(value) {
    this.profileForm = this.formBuilder.group({
      fullname: [value.fullName],
      gender: [value.gender],
      phone: [value.phone],
      email: [value.email],
      state: [value.state],
      city: [value.city]
    });
  }

  async editInfo() {
    console.log("In modal");
    const modal = await this.modalCtrl.create({
      component: EdituserinfoPage,
    });
    modal.onDidDismiss().then(res => {
      if (res.data != undefined) {
        this.initEditForm(res.data);
      }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  async selectImage() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Upload From',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log('Camera clicked');
          const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          };
          this.camera.getPicture(options).then((imageData) => {
            //this.imageUrl = 'data:image/jpeg;base64,' + imageData;
            this.imageUrl = 'data:image/jpeg;base64,' + imageData;
            this.uploadImage(this.imageUrl);
            console.log(JSON.stringify(imageData));
          }, (err) => {
            // Handle error
            alert(err);
          });
        }
      }, {
        text: 'Photos',
        icon: 'photos',
        handler: () => {
          console.log('Gallery clicked');
          const options: CameraOptions = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
          };
          this.camera.getPicture(options).then((imageData) => {
            // this.imageUrl = 'data:image/jpeg;base64,' + imageData;
            this.imageUrl = 'data:image/jpeg;base64,' + imageData;
            // alert("URl " + imgData);
            this.uploadImage(this.imageUrl);
            console.log(JSON.stringify(imageData));
            // alert("Image data " + imageData);
            // alert("Image Url " + this.imageUrl);
            // alert(imageData);
          }, (err) => {
            alert("Error " + err);
          });
        }
      }, {
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

  uploadImage(imageData) {
    alert("in api call");
    let formData = new FormData();
    formData.append('type', this.userData['type']);
    formData.append('email', this.userData['email']);
    formData.append('image', imageData);
    let token = this.userData['token'];
    console.log(JSON.stringify(formData));
    console.log(token);
    alert("Formdata " + JSON.stringify(formData));

    this.dataAccess.uploadImage(formData, token).then(response => {
      ``
      alert("in response");
      alert("Response " + JSON.stringify(response));
      alert("respText " + response['txt']);
      if (response['st'] == "success") {
        this.toastMsg(response['txt']);
        let data = {
          "Image": response['path'],
          "city": this.userData['city'],
          "email": this.userData['email'],
          "fullName": this.userData['fullName'],
          "gender": this.userData['gender'],
          "id": this.userData['id'],
          "phone": this.userData['phone'],
          "state": this.userData['state'],
          "token": this.userData['token'],
          "type": this.userData['token']
        };
        console.log("Updated Data " + JSON.stringify(data));
        alert("data " + JSON.stringify(data));
        this.storage.set("tempUserData", data);
      } else {
        this.toastMsg(response['txt']);
      }
    }, err => {
      alert("Api err " + err);
    });
  }

  async toastMsg(txt) {
    console.log("In toast");
    let toast = await this.toast.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }

  changePassword() {
    this.navCtrl.navigateForward(['/changepassword']);
  }

  //   ionViewWillEnter() {
  //     alert("will enter");
  //   }

  //   ionViewDidEnter() {
  //     alert("Did enter");
  //   }

  //   ionViewWillLeave() {
  //     alert("will leave");
  //   }

  //   ionViewDidLeave() {
  //     alert("did leave");
  //   }

}
