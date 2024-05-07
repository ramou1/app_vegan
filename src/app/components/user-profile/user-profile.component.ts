import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent  implements OnInit {

  @Input() user: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.user);
  }

  public openShare(): void {
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public addUser(user: any): void {
    //TODO ADD USER
    console.log("add user: ", user);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

}
