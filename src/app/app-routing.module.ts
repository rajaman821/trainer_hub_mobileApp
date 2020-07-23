import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },//main page s
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },//main page l
  { path: 'loggedinuser', loadChildren: './loggedinuser/loggedinuser.module#LoggedinuserPageModule' },// student home
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'findtutor', loadChildren: './findtutor/findtutor.module#FindtutorPageModule' },
  { path: 'edituserinfo', loadChildren: './edituserinfo/edituserinfo.module#EdituserinfoPageModule' },
  { path: 'historytickets', loadChildren: './historytickets/historytickets.module#HistoryticketsPageModule' },
  { path: 'viewteachers', loadChildren: './viewteachers/viewteachers.module#ViewteachersPageModule' },
  { path: 'teacherloggedin', loadChildren: './teacherloggedin/teacherloggedin.module#TeacherloggedinPageModule' }, // teacher home
  { path: 'teacherprofile', loadChildren: './teacherprofile/teacherprofile.module#TeacherprofilePageModule' },
  { path: 'teacheraddskill', loadChildren: './teacheraddskill/teacheraddskill.module#TeacheraddskillPageModule' },
  { path: 'teachereditprofile', loadChildren: './teachereditprofile/teachereditprofile.module#TeachereditprofilePageModule' },
  { path: 'teacherdetails', loadChildren: './teacherdetails/teacherdetails.module#TeacherdetailsPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'password-reset', loadChildren: './password-reset/password-reset.module#PasswordResetPageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
