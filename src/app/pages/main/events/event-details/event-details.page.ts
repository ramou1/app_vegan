import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  public data: any;
  @Input() event: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.event);
  }

  ionViewDidEnter(): void {
    this.getRecipeData();
  }

  public getRecipeData(): void {
    if (this.event) {
      this.data = this.event;      
    }
    else {
      // this.toast.presentErrorToast(EVENTS_TXT.EVENTS_SHOW_ERROR);
      // console.log(EVENTS_TXT.EVENTS_SHOW_ERROR);
      setTimeout(() => {
        this.goBack();
      }, 2000);
    }
  }


  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

}
