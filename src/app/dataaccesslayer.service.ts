import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrls } from './constants';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataaccesslayerService {
  token: any;

  constructor(public http: HttpClient, private apiUrl: ApiUrls, public storage: Storage) {

  }

  registerStudentCall(data) {

    return new Promise(resolve => {
      this.http.post(this.apiUrl.studentRegisterURL, data)
        .subscribe(responseFromRegisterCall1 => {
          resolve(responseFromRegisterCall1);
          //    console.log("Resp from StuReg Call:" + JSON.stringify(responseFromRegisterCall1));
        }),
        err => {
          console.log("Error Stureg : " + err);
        }
    });
  }

  registerTeacherCall(data) {

    return new Promise(resolve => {
      this.http.post(this.apiUrl.teacherRegisterURL, data)
        .subscribe(responseFromRegisterCall1 => {
          resolve(responseFromRegisterCall1);
          //  console.log("Resp from TeacherReg Call:" + JSON.stringify(responseFromRegisterCall1));
        }),
        err => {
          console.log("Error TeacherReg user: " + err);
        }
    });
  }

  loginUserCall(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl.loginURL, data)
        .subscribe(responseFromLoginCall2 => {
          resolve(responseFromLoginCall2);
          //     console.log("Resp from Login Call: " + JSON.stringify(responseFromLoginCall2));
        }),
        err => {
          console.log("Error login user: " + err);
        }
    });
  }

  editProfile(data, token) {

    let headers = new HttpHeaders({ 'token': token });

    return new Promise(resolve => {
      this.http.post(this.apiUrl.editProfileURL, data, { headers })
        .subscribe(responseFromEditProfile => {
          resolve(responseFromEditProfile);
        });
    });
  }

  getStatesList() {

    return new Promise(resolve => {
      this.http.get(this.apiUrl.statesURl)
        .subscribe(responseFromStatesCall => {
          resolve(responseFromStatesCall);
          console.log(JSON.stringify(responseFromStatesCall));
        }),

        err => {
          console.log(err);
        }
    });
  }


  getEducationList(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.educationURL, data, { headers })
        .subscribe(responseFromEduCall => {
          resolve(responseFromEduCall);
          console.log("ResponseFromEducall " + JSON.stringify(responseFromEduCall));
        }),

        err => {
          console.log(err);
        }
    });
  }

  getClassList(data, token) {

    console.log("Data " + data);

    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.classURL, data, { headers })
        .subscribe(responseFromClassCall => {
          resolve(responseFromClassCall);
          console.log("respfromclass " + JSON.stringify(responseFromClassCall));
        }),

        err => {
          console.log(err);
        }
    });
  }

  getSubjectsList(data, token) {

    console.log("in DAL SUbjList");

    let headers = new HttpHeaders({ 'token': token });

    return new Promise(resolve => {
      this.http.post(this.apiUrl.subjectsURL, data, { headers })
        .subscribe(responseFromSubjList => {
          resolve(responseFromSubjList);
          console.log("respFromSubList " + JSON.stringify(responseFromSubjList));
        }),

        err => {
          console.log(err);
        }
    });
  }

  raiseTicket(data, token) {

    //  debugger;
    let headers = new HttpHeaders({ 'token': token });

    return new Promise(resolve => {
      this.http.post(this.apiUrl.submitTicket, data, { headers })
        .subscribe(responseFromTicketCall => {
          resolve(responseFromTicketCall);
          console.log("Resp from ticket call " + JSON.stringify(responseFromTicketCall));
        }),
        err => {
          console.log(err);
        }
    });
  }

  updateLocation(data, token) {

    let headers = new HttpHeaders({ 'token': token });

    return new Promise(resolve => {
      this.http.post(this.apiUrl.updateLoation, data, { headers })
        .subscribe(responseFromLocCall => {
          resolve(responseFromLocCall);
          console.log("resp from location " + JSON.stringify(responseFromLocCall));
        }),
        err => {
          console.log(err);
        }
    });
  }

  getTickets(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.getTicketsURL, data, { headers })
        .subscribe(responseFromGetTicketCall => {
          resolve(responseFromGetTicketCall);
          console.log("getTicket " + JSON.stringify(responseFromGetTicketCall));
        }),
        err => {
          console.log(err);
        }
    });
  }

  getTeachers(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.getTeachersURL, data, { headers })
        .subscribe(responseFromTachersCall => {
          resolve(responseFromTachersCall);
          console.log("Resp " + JSON.stringify(responseFromTachersCall));
        })
    });
  }

  uploadImage(data, token) {
    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.imageUploadURL, data, { headers })
        .subscribe(responseFromImageCall => {
          resolve(responseFromImageCall);
          console.log(JSON.stringify("IMG " + responseFromImageCall));
        })
    });
  }

  profileEdit(data, token) {
    let headers = new HttpHeaders({ 'token': token });
    return new Promise((resolve) => {
      this.http.post(this.apiUrl.editProfileURL, data, { headers })
        .subscribe(resfromProfile => {
          resolve(resfromProfile);
        },
          err => {
            console.log("Error Stureg : " + err);
          }
        );
    });
  }

  addSkill(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise((resolve) => {
      this.http.post(this.apiUrl.AddteacherSkill, data, { headers })
        .subscribe(resfromtchr => {
          resolve(resfromtchr);
        },
          err => {
            console.log("Error Stureg : " + err);
          }
        );
    });

  }
  getSkill(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise((resolve) => {
      this.http.post(this.apiUrl.getTeacherSkills, data, { headers })
        .subscribe(resfromtechr => {
          resolve(resfromtechr);
        },
          err => {
            console.log("Error Stureg : " + err);
          }
        );
    });
  }

  updateSkill(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise((resolve) => {
      this.http.post(this.apiUrl.updateTeacherSkills, data, { headers })
        .subscribe(resfromtcher => {
          resolve(resfromtcher);
        },
          err => {
            console.log("Error Stureg : " + err);
          }
        );
    });
  }

  deleteSkill(data, token) {

    let headers = new HttpHeaders({ 'token': token });
    return new Promise((resolve) => {
      this.http.post(this.apiUrl.deleteSkills, data, { headers })
        .subscribe(restcher => {
          resolve(restcher);
        },
          err => {
            console.log("Error Stureg : " + err);
          }
        );
    });
  }

  getTeacherInfo(data, token) {
    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.getTeacherDetailsURL, data, { headers })
        .subscribe(respFromGetTeacher => {
          resolve(respFromGetTeacher);
        },
          err => {
            console.log("error " + err);
          });
    });
  }

  closeStudentTicket(data, token) {
    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.closeTicketURL, data, { headers })
        .subscribe(respFromCloseTicket => {
          resolve(respFromCloseTicket);
          console.log("CloseTicket " + JSON.stringify(respFromCloseTicket));
        });
    });
  }

  forgotPassword(email) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl.forgotPasswordURL + 'email=' + email)
        .subscribe(responseFromForgotCall => {
          resolve(responseFromForgotCall);
        });
    });
  }

  verifyCode(email, code) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl.checkCodeURL + 'email=' + email + '&' + 'code=' + code)
        .subscribe(responseFromVerifyCode => {
          resolve(responseFromVerifyCode);
        });
    });
  }

  resetPassword(email, password) {
    let data = {
      "email": email,
      "password": password
    };
    return new Promise(resolve => {
      this.http.post(this.apiUrl.resetPasswordURL, data)
        .subscribe(responseFromRestCall => {
          resolve(responseFromRestCall);
        });
    });
  }

  updatePassword(data, token) {
    let headers = new HttpHeaders({ 'token': token });
    return new Promise(resolve => {
      this.http.post(this.apiUrl.updatePasswordURL, data, { headers })
        .subscribe(responseFromUpdatePassword => {
          resolve(responseFromUpdatePassword)
        });
    });
  }
}