import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { OrganizationService } from 'src/app/services/organization.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-organization',
  templateUrl: './new-organization.page.html',
  styleUrls: ['./new-organization.page.scss'],
})
export class NewOrganizationPage implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private toast: ToastService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(8)]],
      city: [null],
    });
  }

  public async save(): Promise<void> {
    if (this.formGroup.invalid) {
      await this.toast.showToast('preencha nome e descrição', true);
      return;
    }

    const organization = this.organizationService.create(this.formGroup.value);
    await this.toast.showToast(`organização "${organization.name}" criada`);

    const modal = await this.modalCtrl.getTop();
    if (modal) {
      await this.modalCtrl.dismiss(organization);
      return;
    }

    this.navCtrl.back();
  }

  public goBack(): void {
    this.modalCtrl.dismiss().catch(() => {
      if (window.history.length > 1) {
        this.navCtrl.back();
      } else {
        this.router.navigate(['/', APP_ROUTES.MAIN, APP_ROUTES.EVENTS]);
      }
    });
  }
}
