import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ChooseInterestsComponent } from 'src/app/components/choose-interests/choose-interests.component';
import { ReportProblemsComponent } from 'src/app/components/report-problems/report-problems.component';
import { ESTADOS } from 'src/app/constants/estados.const';
import { InterestOption } from 'src/app/constants/interests.const';
import { USER } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { STORAGE } from 'src/app/constants/storage.const';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  public user: any;
  public loading = false;
  public formGroup: FormGroup;
  public passwordGroup: FormGroup;
  public showPasswordSection = false;
  public theme: 'light' | 'dark' = 'light';
  public language = 'pt';
  public estados = ESTADOS;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    this.createForm();
    this.getUserData();
    this.loadPreferences();
  }

  public getUserData(): void {
    this.user = USER;
    if (!this.user.interests) {
      this.user.interests = [];
    }
    this.formGroup.patchValue(this.user);
  }

  private loadPreferences(): void {
    this.theme = (this.storage.getItem(STORAGE.THEME) as 'light' | 'dark') || 'light';
    this.language = this.storage.getItem(STORAGE.LANGUAGE) || 'pt';
    this.formGroup.patchValue({
      language: this.language,
      theme: this.theme,
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      birth: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, [Validators.required]],
      country: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      identify: [null, Validators.required],
      language: ['pt', Validators.required],
      theme: ['light', Validators.required],
    });

    this.passwordGroup = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  public togglePasswordSection(): void {
    this.showPasswordSection = !this.showPasswordSection;
  }

  public onThemeChange(theme: 'light' | 'dark'): void {
    this.theme = theme;
    this.formGroup.patchValue({ theme });
    this.storage.addItem(STORAGE.THEME, theme);
    document.body.classList.toggle('dark', theme === 'dark');
  }

  public onLanguageChange(language: string): void {
    this.language = language;
    this.formGroup.patchValue({ language });
    this.storage.addItem(STORAGE.LANGUAGE, language);
  }

  public async deleteAccount(): Promise<void> {
    const confirmed = await this.toast.confirm(
      'tem certeza que deseja excluir sua conta? esta ação não pode ser desfeita.',
      'excluir conta',
      'excluir',
      'cancelar'
    );

    if (confirmed) {
      await this.toast.showToast('conta marcada para exclusão (simulação)');
      this.logout();
    }
  }

  async openInterests(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ChooseInterestsComponent,
      cssClass: 'choose-interest-modal',
      componentProps: {
        selected: [...(this.user.interests || [])],
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss<InterestOption[]>();

    if (data) {
      this.user.interests = data;
      USER.interests = data;
    }
  }

  async reportProblems(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ReportProblemsComponent,
      cssClass: 'report-problems-modal',
    });

    return await modal.present();
  }

  public async deleteInterest(interest: InterestOption): Promise<void> {
    const confirmed = await this.toast.confirm(
      `remover o interesse "${interest.description}"?`,
      'remover interesse',
      'remover',
      'cancelar'
    );

    if (!confirmed) {
      return;
    }

    this.user.interests = (this.user.interests || []).filter(
      (item: InterestOption) => item.description !== interest.description
    );
    USER.interests = this.user.interests;
  }

  public logout(): void {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot(APP_ROUTES.START);
  }

  public async saveData(): Promise<void> {
    if (this.showPasswordSection) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordGroup.value;

      if (newPassword || confirmPassword || currentPassword) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          await this.toast.showToast('preencha todos os campos de senha', true);
          return;
        }
        if (newPassword !== confirmPassword) {
          await this.toast.showToast('as senhas novas não coincidem', true);
          return;
        }
      }
    }

    Object.assign(USER, this.formGroup.value);
    this.storage.addItem(STORAGE.THEME, this.formGroup.value.theme);
    this.storage.addItem(STORAGE.LANGUAGE, this.formGroup.value.language);
    document.body.classList.toggle('dark', this.formGroup.value.theme === 'dark');

    await this.toast.showToast('dados salvos');
    setTimeout(() => this.goBack(), 800);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
