import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notifications = [
    {
      title: 'New Follower',
      description: 'John Doe followed you.',
      icon: 'person-add'
    },
    {
      title: 'New Like',
      description: 'John Doe liked your post.',
      icon: 'heart'
    },
    {
      title: 'New Comment',
      description: 'John Doe commented on your post.',
      icon: 'chatbubble'
    },
    {
      title: 'New Mention',
      description: 'John Doe mentioned you in a post.',
      icon: 'at'
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
