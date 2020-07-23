import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Router } from '@angular/router';
import { NavController, MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-findtutor',
  templateUrl: './findtutor.page.html',
  styleUrls: ['./findtutor.page.scss'],
})
export class FindtutorPage implements OnInit {
  userData: any[];
  email: any;
  educationList = [];
  skillForm: FormGroup;
  token: any;
  classList = [];
  subjectsList = [];

  constructor(private storage: Storage, public formBuilder: FormBuilder, private dataAccess: DataaccesslayerService,
    private route: Router, private navCtrl: NavController, private menuCtrl: MenuController, private toast: ToastController) {

    this.initSkillForm();
    //this.menuCtrl.enable(true);

    this.storage.get("tempUserData").then(res => {
      this.userData = res;
      this.eduFunc();
      this.observableMethod1();
      this.observableMethod2();
      this.observableMethod3();
    });

  }


  observableMethod1(): any {

    this.skillForm.get('education').valueChanges.subscribe(id => {
      if (id != undefined || id != null || id != "") {
        this.getClassVal(id);
      }
    });
  }

  observableMethod2() {

    //  debugger;
    this.skillForm.get('class').valueChanges.subscribe(id => {
      if (id != undefined || id != null || id != "") {
        console.log("class id " + id);
        this.getSubjects(id);
      }
    });
  }

  observableMethod3() {

    this.skillForm.get('subjects').valueChanges.subscribe(id => {
      // if (id != undefined || id != null || id != "") {
      console.log("subjects id " + id);
      //   this.getSubjects(id);
      //}
    });
  }

  initSkillForm() {
    this.skillForm = this.formBuilder.group({
      education: [null, Validators.required],
      class: [null, Validators.required],
      subjects: [null, Validators.required],
      type_of_tution: [null, Validators.required],
      radius: [null, Validators.required]
    });
  }

  eduFunc() {

    let userData = {
      "email": this.userData['email']
    };

    this.token = this.userData['token'];
    console.log("token " + this.token);

    this.dataAccess.getEducationList(userData, this.token).then(responseFromEduCall => {
      this.educationList = responseFromEduCall['detail'];
      console.log("eduListArr " + JSON.stringify(this.educationList));
    });
  }

  getClassVal(id) {

    let userData = {
      "email": this.userData['email'],
      "education": id
    };
    console.log("Userdata class " + JSON.stringify(userData));

    this.dataAccess.getClassList(userData, this.token).then(responseFromClassCall => {
      this.classList = responseFromClassCall['detail'];
      console.log("ClassList " + JSON.stringify(this.classList));
    });

  }

  getSubjects(id) {

    console.log("Subj ID " + id);
    console.log("in sub list");

    let userData = {
      "classid": id,
      "email": this.userData['email']
    };
    console.log("Userdata class " + JSON.stringify(userData));

    this.dataAccess.getSubjectsList(userData, this.token).then(responseFromSubCall => {
      this.subjectsList = responseFromSubCall['detail'];
      console.log("ClassList " + JSON.stringify(this.subjectsList));
    });
  }

  submitSkill(data) {
    console.log("Value of skills " + JSON.stringify(data));
    let email = this.userData['email'];
    console.log("email " + email);
    let id = this.userData['id'];
    console.log("id " + id);
    let subs = [];
    subs = this.skillForm.value.subjects;
    let subString = subs.toString();
    console.log("Substr " + subString);
    let userData = {
      "education_id": this.skillForm.value.education,
      "class_id": this.skillForm.value.class,
      "subject_id": subString,
      "total_distance": this.skillForm.value.radius,
      "type_of_tution": this.skillForm.value.type_of_tution,
      "email": this.userData['email'],
      "student_id": id
    };

    console.log("userData for ticket" + JSON.stringify(userData));

    if (userData.education_id == undefined || userData.class_id == undefined || userData.subject_id == undefined || userData.total_distance == undefined || userData.type_of_tution == undefined || userData.student_id == undefined || userData.email == undefined) {
      console.log("Please fill complete details");
    }
    else {
      this.dataAccess.raiseTicket(userData, this.token).then(responseFromTicketCall => {
        console.log("Resp from Ticket call " + JSON.stringify(responseFromTicketCall));
        if (responseFromTicketCall['st'] == "success") {
          let msg = "Your ticket has been raised";
          this.toastMsg(msg);
          this.navCtrl.navigateRoot(['/loggedinuser']);
        }
        else {
          this.toastMsg(responseFromTicketCall['txt']);
          this.navCtrl.navigateRoot(['/loggedinuser']);
        }
      });
    }

  }

  async toastMsg(msg) {
    console.log("In toast");
    let toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

}
