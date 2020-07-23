import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-historytickets',
  templateUrl: './historytickets.page.html',
  styleUrls: ['./historytickets.page.scss'],
})
export class HistoryticketsPage implements OnInit {

  information: any = [];
  userData: any[];

  constructor(private menu: MenuController, private storage: Storage, public dataAccess: DataaccesslayerService) {
    //this.menu.enable(true);
    this.storage.get("tempUserData").then(res => {
      this.userData = res;
      this.getHistoryTickets();
      this.getHistoryTickets();
    });
  }

  getHistoryTickets() {
    let data = {
      "student_id": this.userData['id'],
      "email": this.userData['email']
    };
    let token = this.userData['token'];

    this.dataAccess.getTickets(data, token).then(responseFromGetTicketCall => {
      if (responseFromGetTicketCall['st'] == "success") {
        let data = responseFromGetTicketCall['detail'];
        this.information = data.filter(element => element['TicketStatus'] == 0);
        console.log(JSON.stringify(this.information));
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }
}
