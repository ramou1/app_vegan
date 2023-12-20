import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';
import { ToastService } from 'src/app/services/toast.service';
import { ProfileEditPage } from './profile-edit/profile-edit.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: any;
  slideOpts = {
    slidesPerView: 1.5,
  };

  constructor(private router: Router, private modalCtrl: ModalController, private toast: ToastService) { }

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


}
