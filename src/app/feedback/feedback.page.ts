import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  submitNoFeedback() {
    console.log("No clicked");
    let feedbackText = "No feedback entered";
    this.popoverController.dismiss(feedbackText);
  }

  submitFeedback(text) {
    console.log("FBT " + text);
    let feedbackText = text.trim();
    if(feedbackText != ""){
    this.popoverController.dismiss(feedbackText);
    } else{
      let feedbackText = "No feedback entered";
      this.popoverController.dismiss(feedbackText);
    }
  }

}
