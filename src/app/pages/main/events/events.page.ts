import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonSearchbar, ModalController } from '@ionic/angular';
import { EVENTS } from 'src/app/constants/mock.const';
import { EventDetailsPage } from './event-details/event-details.page';
import { ReportPostsComponent } from 'src/app/components/report-posts/report-posts.component';
import { NewEventPage } from './new-event/new-event.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  public buttonColor = 'primary';
  public interestedText = 'quero ir';
  public interestedIcon = 'leaf-outline';
  public interested: boolean = false;

  @ViewChild('eventsSearchbar') searchbar: IonSearchbar;
  public events = EVENTS;
  public filteredEvents: any = [];

  constructor(private router: Router, private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.filteredEvents = this.events;
  }

  public filterList(evt: any): void {
    const searchTerm = evt.target.value;

    if (searchTerm === '') {
      this.filteredEvents = this.events;
    }
    else {
      this.filteredEvents = this.events?.filter((data: any) => {
        return data.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }).slice(0, 15);
    }
  }

  async openEvent(event: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EventDetailsPage,
      cssClass: 'search-modal',
      componentProps: {
        // finalize: false,
        event: event
      }
    });

    return await modal.present();
  }

  public checkInterested(event: any): void {
    this.interested = !this.interested;

    if (this.interested) {
      this.buttonColor = 'secondary';
      this.interestedText = 'tenho interesse';
      this.interestedIcon = 'checkmark-circle-outline'
    }
    else {
      this.buttonColor = 'primary';
      this.interestedText = 'quero ir';
      this.interestedIcon = 'leaf-outline'
    }

  }

  public openShare(event: Event): void {
    event.stopPropagation();
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  async presentEventActions(event: Event, eventDetail: any) {
    event.stopPropagation();
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
      component: ReportPostsComponent,
      cssClass: 'report-posts-modal',
      componentProps: {
        post_id: event.id
      }
    });

    return await modal.present();
  }

  async newEvent(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewEventPage,
      cssClass: 'event-modal',
    });

    return await modal.present();
  }

}
