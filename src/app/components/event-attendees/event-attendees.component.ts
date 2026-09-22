import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-attendees',
  templateUrl: './event-attendees.component.html',
  styleUrls: ['./event-attendees.component.scss'],
})
export class EventAttendeesComponent implements OnInit {
  @Input() attendees: any[] = [];
  @Input() title = 'quem vai';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

  public getImage(user: any): string {
    if (!user?.image) {
      return '../assets/images/default-user.png';
    }
    if (String(user.image).startsWith('data:') || String(user.image).startsWith('http')) {
      return user.image;
    }
    return `../assets/images/${user.image}`;
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
