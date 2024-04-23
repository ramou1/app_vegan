import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ReportComponent } from 'src/app/components/report/report.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  public data: any;
  @Input() event: any;

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    console.log(this.event);
  }

  ionViewDidEnter(): void {
    this.getEventData();
  }

  public getEventData(): void {
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

  public confirmPresence(): void {
    //TODO PRESENCE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  async presentEventActions(event: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'denunciar evento',
          handler: () => {
            this.reportEvent(event);
          }
        },
        {
          text: 'favoritar evento',
          data: {
            action: 'share',
          },
        },
        {
          text: 'convidar amigos',
        },
        // {
        //   text: 'cancelar',
        //   role: 'cancel',
        //   data: {
        //     action: 'cancel',
        //   },
        // },
      ]
    });
    await actionSheet.present();
  }

  async reportEvent(event: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ReportComponent,
      cssClass: 'report-modal',
      componentProps: {
        post_id: event.id
      }
    });

    return await modal.present();
  }

  public openShare(): void {
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

}
