import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';
import { ToastService } from 'src/app/services/toast.service';
import { ProfileEditPage } from './profile-edit/profile-edit.page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public type: string = 'posts';
  public user: any;
  slideOpts = {
    slidesPerView: 1.5,
  };

  constructor(private router: Router, private modalCtrl: ModalController, private toast: ToastService, private actionSheetCtrl: ActionSheetController, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.getUserData();
  }

  public getUserData(): void {
    this.user = USER;
  }

  public excerptText(text: string): string {
    const cut = text.substring(0, 100);
    return cut;
  }

  public openShare(): void {
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  // public openSettings(): void {
  //   this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.PROFILE_EDIT]);
  // }

  async openSettings(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ProfileEditPage,
      cssClass: 'edit-profile-modal',
    });

    return await modal.present();
  }

  async changeImageActions(type: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'change ' + (type === 'profile' ? 'profile' : 'background') + ' picture',
        },
        {
          text: 'view ' + (type === 'profile' ? 'profile' : 'background') + ' picture',
          // handler: () => {
          //   this.openImage(type);
          // }
          // data: {
          //   action: 'share',
          // },
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

  // openImage(imageUrl: string) {
  //   imageUrl = 'https://www.w3schools.com/w3css/img_lights.jpg';
  //   // imageUrl = '../assets/images/' +
  //   //   this.user.image ? this.user.image : 'default-user.png';
  //   window.open(imageUrl, '_blank');
  // }

  public changeProfilePicture(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public changeBGPicture(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }


}
