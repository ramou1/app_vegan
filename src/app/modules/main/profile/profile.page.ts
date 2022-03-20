import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';
import { ProfileEditPage } from '../profile-edit/profile-edit.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;
  slideOpts = {
    slidesPerView: 1.5,
  };

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getData();
  }

  public getData(): void {
    this.user = USER;
    console.log(this.user);
    
  }

  public excerptText(text: string): string {
    const cut = text.substring(0, 100);
    return cut;
  }

  public openShare(): void {
    //TODO SHARE
  }
  
  // public openSettings(): void {
  //   this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.PROFILE_EDIT]);
  // }

  async openSettings(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ProfileEditPage,
      cssClass: 'search-modal',
    });

    return await modal.present();
  }


}
