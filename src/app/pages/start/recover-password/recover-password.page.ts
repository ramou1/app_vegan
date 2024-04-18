import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  public recoverForm!: FormGroup;

  // constructor(public injector: Injector) {
  // super(injector);
  // }

  constructor(public fb: FormBuilder, public authSrvc: AuthService, public modalSrvc: ModalService, public navCtrl: NavController, public router: Router, public toastSrvc: ToastService) { }

  async ngOnInit() {
    await this.createForm();
  }

  createForm() {
    this.recoverForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    });
  }

  async recoverPassword() {
    const formData = this.recoverForm.value;
    // const res = await this.authSrvc.forgotPassword(formData.email);

    // if (res?.error) {
    //   this.showToast(res.message, true);
    // } else {
    //   await this.modalSrvc.openInfoModal(MSG_CONST.REQUEST_SENT, MSG_CONST.RESET_PASSWORD_DESCRIPTION, 'success',
    //     [
    //       { text: MSG_CONST.BACK_TO_START, color: 'primary', handler: () => { this.backToStart(); } }
    //     ]);
    // };

    this.toastSrvc.showToast('Email enviado com sucesso!', false);
  }

  async closeRecover() {
    await this.router.navigate([`${APP_ROUTES.START}/${APP_ROUTES.LOGIN}`]);
  }
}
