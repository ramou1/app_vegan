import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ESTADOS } from 'src/app/constants/estados.const';
import { USER } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  public user: any;
  public loading: boolean = false;
  public formGroup: FormGroup;
  estados = ESTADOS;

  constructor(private fb: FormBuilder, private toast: ToastService, private modalCtrl: ModalController, public navCtrl: NavController) { }

  async ngOnInit() {
    this.createForm();
    await this.getUserData();
  }

  public getUserData(): void {
    this.user = USER;
    this.formGroup.patchValue(this.user);
    console.log(this.user);
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      birth: [null, [Validators.required]],
      email: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.minLength(15)]],
      country: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      identify: [null, Validators.required],
    });
  }

  public deleteAccount(): void {
    // this.toast.presentChooseAlert('Deseja deletar a conta?');
  }

  public changeProfilePicture(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public changeBGPicture(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  async openInterests(): Promise<void> {
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);

    // const modal = await this.modalCtrl.create({
    //   component: ChooseInterestComponent,
    //   cssClass: 'choose-interest-modal',
    // componentProps: {
    //   interests: user.interests,
    // }
    // });

    // return await modal.present();
  }

  public deleteInterest(interest: any): void {
    // this.toast.presentChooseAlert('Deseja realmente excluir o interesse ' + interest.description + '?');
  }

  public logout(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot(APP_ROUTES.START);
  }

  public saveData(): void {
    // this.toast.presentToast(TOAST_MSG.SAVE_DATA_SUCCESS);
    setTimeout(() => {
      this.goBack();
    }, 1500);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

}
