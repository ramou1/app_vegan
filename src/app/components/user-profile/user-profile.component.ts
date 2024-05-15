import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent  implements OnInit {

  @Input() user: any;

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    console.log(this.user);
  }

  async presentProfileActions() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'compartilhar perfil',
          handler: () => {
            this.shareProfile();
          }
        },
        {
          text: 'denunciar perfil',
        },
        {
          text: 'bloquear perfil',
          data: {
            // action: 'share',
          },
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

  public shareProfile(): void {
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public followUser(user: any): void {
    //TODO FOLLOW USER
    console.log("follow user: ", user);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

}
