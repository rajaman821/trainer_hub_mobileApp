import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Router } from '@angular/router';
import { FeedbackPage } from '../feedback/feedback.page';

@Component({
  selector: 'app-loggedinuser',
  templateUrl: './loggedinuser.page.html',
  styleUrls: ['./loggedinuser.page.scss'],
})
export class LoggedinuserPage implements OnInit {

  userData: any[];
  information: any = [];

  constructor(private menu: MenuController, private geolocation: Geolocation, private storage: Storage,
    public dataAccess: DataaccesslayerService, private route: Router, private alertCtrl: AlertController,
    public popoverController: PopoverController, private toast: ToastController) {

    this.menu.enable(true);
    this.storage.get("tempUserData").then(res => {
      this.userData = res;
      this.getCoords();
      this.getTickets();
    });
  }

  getCoords() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      if (resp.coords.latitude != undefined && resp.coords.longitude != undefined) {
        let userdata = {
          "type": this.userData['type'],
          "email": this.userData['email'],
          "lat": resp.coords.latitude,
          "long": resp.coords.longitude
        };
        let token = this.userData['token'];

        console.log("LocData " + JSON.stringify(userdata));
        this.dataAccess.updateLocation(userdata, token).then(responseFromLocCall => {
          console.log(JSON.stringify(responseFromLocCall));
        });
      }
      else {
        console.log("Error fetching coordinates");
      }
    }).catch((error) => {
      console.log('Error getting location', JSON.stringify(error));
      // alert('ERROR(' + error.code + '): ' + error.message);
    });

  }

  getTickets() {

    let data = {
      "student_id": this.userData['id'],
      "email": this.userData['email']
    };

    console.log("getT data " + data);

    let token = this.userData['token'];
    console.log("token " + token);

    if (this.userData['type'] == "student") {
      this.dataAccess.getTickets(data, token).then(responseFromGetTicketCall => {
        console.log("gettt " + JSON.stringify(responseFromGetTicketCall));
        if (responseFromGetTicketCall['st'] == "success") {
          let data = responseFromGetTicketCall['detail'];
          this.information = data.filter(element => element['TicketStatus'] == 1);
          console.log(JSON.stringify(this.information));
        }
        else {
          this.information = "";
          console.log(JSON.stringify(this.information));
        }
      });
    }
  }

  onCardSelect(id, tot) {

    console.log("card clicked id " + id + " ", tot);
    let data = {
      "email": this.userData['email'],
      "ticket_id": id,
      "tution_type": tot,
      "token": this.userData['token']
    };

    this.storage.set("localData", data);
    this.route.navigate(['viewteachers']);
  }

  ionViewWillEnter() {
    console.log("Will Enter");
    this.menu.enable(true);
    this.getTickets();
  }

  async confirmCloseTicket(id) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Are you sure you want to close this ticket?',
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
            this.getFeedback(id);
          }
        }
      ]
    });
    return await alert.present();
  }

  ngOnInit() {
    console.log("ON inIT");
  }

  async getFeedback(id) {

    let ev: any;
    const popover = await this.popoverController.create({
      component: FeedbackPage,
      event: ev,
      translucent: true,
      backdropDismiss: false
    });
    popover.onDidDismiss().then(res => {
      console.log("Res from popover " + JSON.stringify(res));
      let fb = res['data'];
      this.closeTicket(id, fb);
    });
    return await popover.present();
  }

  closeTicket(id, fb) {
    let data = {
      "email": this.userData['email'],
      "feedback": fb,
      "ticketId": id,
      "studentId": this.userData['id']
    };
    console.log("data for close ticket " + JSON.stringify(data));
    let token = this.userData['token'];

    this.dataAccess.closeStudentTicket(data, token).then(response => {
      console.log("Response from closeTicketcall" + JSON.stringify(response));
      if (response['st'] == "success") {
        let msg = "Ticket closed Successfully";
        this.toastMsg(msg);
        this.getTickets();
      }
      else {
        this.toastMsg(response['txt']);
      }
    });
  }

  async toastMsg(msg) {
    console.log("In toast");
    let toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}