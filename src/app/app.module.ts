import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiUrls } from './constants';
import { EdituserinfoPage } from './edituserinfo/edituserinfo.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TeacherdetailsPage } from './teacherdetails/teacherdetails.page';
import { FeedbackPage } from './feedback/feedback.page';
import { TeachereditprofilePage } from './teachereditprofile/teachereditprofile.page';

@NgModule({
  declarations: [AppComponent, EdituserinfoPage, TeacherdetailsPage, FeedbackPage, TeachereditprofilePage],
  entryComponents: [EdituserinfoPage, TeacherdetailsPage, FeedbackPage, TeachereditprofilePage],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule],
  providers: [
    ApiUrls,
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}      
