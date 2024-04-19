import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { EVENTS } from 'src/app/constants/mock.const';
import { EventDetailsPage } from './event-details/event-details.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  
  public buttonColor = 'tertiary';
  public interestedText = 'I want to Go!';
  public interestedIcon = 'leaf-outline';
  public interested: boolean = false;

  @ViewChild('eventsSearchbar') searchbar: IonSearchbar;
  public events = EVENTS;
  public filteredEvents: any = [];

  constructor(private router: Router, private modalCtrl: ModalController) { }

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
      this.buttonColor = 'primary';
      this.interestedText = `I'm Interested`;
      this.interestedIcon = 'checkmark-circle-outline'
    }
    else {
      this.buttonColor = 'danger';
      this.interestedText = `I'm not Interested`;
      this.interestedIcon = 'close-circle-outline'
    }

  }

}
