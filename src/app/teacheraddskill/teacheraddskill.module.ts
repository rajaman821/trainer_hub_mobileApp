import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeacheraddskillPage } from './teacheraddskill.page';

const routes: Routes = [
  {
    path: '',
    component: TeacheraddskillPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeacheraddskillPage]
})
export class TeacheraddskillPageModule {}
