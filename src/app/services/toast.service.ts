import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  public async showAlert(message: string, error: boolean = false): Promise<void> {
    let alert = await this.alertCtrl.create({
      message: message,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  public async showToast(message: string, error: boolean = false): Promise<void> {
    let toast = await this.toastCtrl.create({
      message: message,
      cssClass: error ? 'errorToast' : 'successToast',
      duration: 2500
    });

    await toast.present();
  }

  public async confirm(
    message: string,
    header: string = 'confirmação',
    confirmText: string = 'confirmar',
    cancelText: string = 'cancelar'
  ): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
        },
        {
          text: confirmText,
          role: 'confirm',
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }
}
