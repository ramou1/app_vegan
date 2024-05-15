import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NOTIFICATIONS } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public notifications = NOTIFICATIONS;

  //   type: 'follower',
  //   icon: 'person-add'

  //   type: 'like',
  //   icon: 'heart'

  //   type: 'comment',
  //   icon: 'chatbubble'

  //   type: 'mention',
  //   icon: 'at'

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  getUserAvatar(userId: number): string {
    // return `../assets/images/${userId.creator_image} ? ${userId.creator_image} : 'default-user.png'`;
    return '../assets/images/default-user.png';
  }

  public followUser(user: any): void {
    //TODO FOLLOW USER
    console.log("follow user: ", user);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
