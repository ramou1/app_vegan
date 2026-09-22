import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';
import { Organization } from 'src/app/models/organization-model';
import { EventService } from 'src/app/services/event.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ToastService } from 'src/app/services/toast.service';
import { NewOrganizationPage } from '../../organization/new-organization/new-organization.page';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  public eventGroup: FormGroup;
  public ending = false;
  public user = USER;
  public imageUrl: string | null = null;
  public organizations: Organization[] = [];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private organizationService: OrganizationService,
    private eventService: EventService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.organizations = this.organizationService.getCurrentUserOrganizations();
    this.buildForm();
  }

  private buildForm(): void {
    const defaultOrg = this.organizations[0];

    this.eventGroup = this.fb.group({
      organization_id: [defaultOrg?.id || null, [Validators.required]],
      creator_id: this.user.id,
      creator: defaultOrg?.name || this.user.name,
      creator_image: this.user.image,
      registerDate: new Date().toLocaleDateString('pt-BR'),
      image: [null],
      title: [null, [Validators.required]],
      category: ['encontro', [Validators.required]],
      local: [null, [Validators.required]],
      startingDate: [null, [Validators.required]],
      endingDate: [null],
      startingHour: [null, [Validators.required]],
      endingHour: [null],
      description: [null, [Validators.required]],
      confirmed: [[]],
      comments: [[]],
    });
  }

  public onOrganizationChange(orgId: number): void {
    const org = this.organizations.find((item) => item.id === Number(orgId));
    if (org) {
      this.eventGroup.patchValue({
        organization_id: org.id,
        creator: org.name,
      });
    }
  }

  async uploadImage() {
    const mock_image = 'event01.jpg';

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'usar imagem de exemplo',
          handler: () => {
            this.eventGroup.get('image')?.setValue(mock_image);
            this.imageUrl = `../assets/images/${mock_image}`;
          },
        },
        {
          text: 'remover imagem',
          role: 'destructive',
          handler: () => {
            this.eventGroup.get('image')?.setValue(null);
            this.imageUrl = null;
          },
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  public removeEnding(): void {
    this.ending = false;
    this.eventGroup.get('endingDate')?.reset();
    this.eventGroup.get('endingHour')?.reset();
  }

  public async openCreateOrganization(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewOrganizationPage,
      cssClass: 'event-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.organizations = this.organizationService.getCurrentUserOrganizations();
      this.eventGroup.patchValue({
        organization_id: data.id,
        creator: data.name,
      });
    }
  }

  public async addEvent(): Promise<void> {
    if (!this.organizations.length) {
      await this.toast.showToast('crie uma organização antes de publicar o evento', true);
      await this.openCreateOrganization();
      return;
    }

    if (this.eventGroup.invalid) {
      await this.toast.showToast('preencha os campos obrigatórios', true);
      return;
    }

    const value = this.eventGroup.value;
    const [year, month, day] = String(value.startingDate).split('-');
    const formattedStart = year && month && day ? `${day}/${month}/${year}` : value.startingDate;

    let formattedEnd = value.endingDate;
    if (value.endingDate && String(value.endingDate).includes('-')) {
      const [y, m, d] = String(value.endingDate).split('-');
      formattedEnd = `${d}/${m}/${y}`;
    }

    this.eventService.add({
      ...value,
      startingDate: formattedStart,
      endingDate: formattedEnd,
      title: String(value.title).toLowerCase(),
      category: String(value.category).toLowerCase(),
      local: String(value.local).toLowerCase(),
      description: String(value.description).toLowerCase(),
      image: value.image || 'slider-default.jpeg',
    });

    await this.toast.showToast('evento criado');
    this.goBack();
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
