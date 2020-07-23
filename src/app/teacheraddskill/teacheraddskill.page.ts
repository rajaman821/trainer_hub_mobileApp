import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController, MenuController } from '@ionic/angular';
import { DataaccesslayerService } from '../dataaccesslayer.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-teacheraddskill',
  templateUrl: './teacheraddskill.page.html',
  styleUrls: ['./teacheraddskill.page.scss'],
})
export class TeacheraddskillPage implements OnInit {
  myForm: FormGroup;
  userArr: {};
  email: any;
  object: {};
  arr: {};
  token: any = [];
  arr1: any = [];
  object1: {};
  object2: {};
  arr2: any = [];
  result: {};
  eduId: any;
  clsId: any;
  subId: any;
  tid: any;

  constructor(public storage: Storage, public datacesslayer: DataaccesslayerService, public navCtrl: NavController,
    public formBuilder: FormBuilder, public toastCtrl: ToastController, public menuCtrl: MenuController) {

    this.menuCtrl.enable(false);
    this.storage.get("tempUserData").then(res => {
      this.userArr = res;
      this.tid = res['id'];
      console.log(this.tid);
      console.log(this.userArr);
      this.educatn(this.userArr);
    });
    this.getVal();
    this.observableMethod();
    this.observableMethod2();
    this.observableMethod3();
  }

  observableMethod() {
    this.myForm.get('education').valueChanges.subscribe(id => {
      if (id != undefined || id != null || id != "") {
        this.getClass(id);
        this.eduId = id;
        console.log(id);
      }

    });
  }

  observableMethod2() {
    this.myForm.get('classDescription').valueChanges.subscribe(id => {
      if (id != undefined || id != null || id != "") {
        this.getSubjects(id);
        this.clsId = id;

        console.log(id)
      }
    });
  }

  observableMethod3() {
    this.myForm.get('subjects').valueChanges.subscribe(id => {
      if (id != undefined || id != null || id != "") {

        this.subId = id;
        console.log(id)
      }
    });
  }

  getVal() {
    this.myForm = this.formBuilder.group({
      education: [, [Validators.required]],
      classDescription: [, [Validators.required]],
      subjects: [, [Validators.required]]
    })
  }
  educatn(value) {
    this.email = value['email'];
    console.log(this.email);
    this.token = value['token'];
    console.log(this.token);

    this.object = {
      "email": this.email
    };
    this.datacesslayer.getEducationList(this.object, this.token).then(res => {
      console.log(res);
      console.log(JSON.stringify(res));
      this.arr = res['detail'];
      console.log(this.arr);
    });
  }

  getClass(id) {
    this.object1 = {
      "email": this.email,
      "education": id,
    }
    this.datacesslayer.getClassList(this.object1, this.token).then(res => {
      console.log(JSON.stringify(res));
      this.arr1 = res['detail'];
      console.log(this.arr1);
    });
  }
  getSubjects(id) {
    this.object2 = {
      "email": this.email,
      "classid": id,
    }
    this.datacesslayer.getSubjectsList(this.object2, this.token).then(res => {
      console.log(JSON.stringify(res));
      this.arr2 = res['detail'];
      console.log(this.arr2);
    });
  }

  sendDetails() {
    var subArr = [];
    subArr = this.subId;
    this.result = {
      "email": this.email,
      "education_id": this.eduId,
      "class_id": this.clsId,
      "subject_id": subArr.toString(),
      "teacher_id": this.tid,
    };

    this.datacesslayer.addSkill(this.result, this.token).then(res => {
      console.log(res);
      console.log(JSON.stringify(res));

      if (res['st'] == "success") {
        this.toastAddSkills();
         this.navCtrl.navigateBack('/teacherloggedin'); 
      }
      else {
        this.toastError();
      }
    });
  }
  async toastAddSkills() {
    const toast = await this.toastCtrl.create({
      message: 'You added the skill',
      duration: 2000
    });
    toast.present();
  }

  async toastError() {  
    const toast = await this.toastCtrl.create({
      message: 'Maximum 5 skills can be added. Please delete a skill to add new one',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }
}
