import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
