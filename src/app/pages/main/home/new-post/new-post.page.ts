import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';
import { ToastService } from 'src/app/services/toast.service';

type PostAttachment = {
  type: 'image' | 'video';
  url: string;
  label: string;
};

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  public postGroup: FormGroup;
  public user = USER;
  public attachments: PostAttachment[] = [];
  public taggedPeople: string[] = [];
  public location = '';
  public feeling = '';

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.postGroup = this.fb.group({
      creator_id: this.user.id,
      creator: this.user.name,
      creator_image: this.user.image,
      registerDate: new Date().toLocaleDateString('pt-BR'),
      images: [[]],
      text: ['', [Validators.required, Validators.minLength(1)]],
      comments: [[]],
    });
  }

  public async openMediaOptions(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'adicionar mídia',
      buttons: [
        {
          text: 'foto da galeria',
          icon: 'images-outline',
          handler: () => this.addMockMedia('image', 'galeria'),
        },
        {
          text: 'tirar foto',
          icon: 'camera-outline',
          handler: () => this.addMockMedia('image', 'câmera'),
        },
        {
          text: 'vídeo da galeria',
          icon: 'videocam-outline',
          handler: () => this.addMockMedia('video', 'vídeo'),
        },
        {
          text: 'gravar vídeo',
          icon: 'radio-outline',
          handler: () => this.addMockMedia('video', 'gravação'),
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  public async openLocation(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'adicionar local',
      buttons: [
        {
          text: 'são paulo, sp',
          handler: () => {
            this.location = 'são paulo, sp';
          },
        },
        {
          text: 'parque ibirapuera',
          handler: () => {
            this.location = 'parque ibirapuera';
          },
        },
        {
          text: 'vila madalena',
          handler: () => {
            this.location = 'vila madalena';
          },
        },
        {
          text: 'remover local',
          role: 'destructive',
          handler: () => {
            this.location = '';
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

  public async openTagPeople(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'marcar pessoas',
      buttons: [
        {
          text: 'gabriel ortiz',
          handler: () => this.toggleTag('gabriel ortiz'),
        },
        {
          text: 'maria fuller',
          handler: () => this.toggleTag('maria fuller'),
        },
        {
          text: 'laura sara',
          handler: () => this.toggleTag('laura sara'),
        },
        {
          text: 'lauro santos',
          handler: () => this.toggleTag('lauro santos'),
        },
        {
          text: 'limpar marcações',
          role: 'destructive',
          handler: () => {
            this.taggedPeople = [];
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

  public async openFeeling(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'como você está?',
      buttons: [
        { text: 'feliz', handler: () => { this.feeling = 'feliz'; } },
        { text: 'inspirado', handler: () => { this.feeling = 'inspirado'; } },
        { text: 'com fome', handler: () => { this.feeling = 'com fome'; } },
        { text: 'agradecido', handler: () => { this.feeling = 'agradecido'; } },
        {
          text: 'remover sentimento',
          role: 'destructive',
          handler: () => { this.feeling = ''; },
        },
        { text: 'cancelar', role: 'cancel' },
      ],
    });

    await actionSheet.present();
  }

  public async openPoll(): Promise<void> {
    await this.toast.showToast('enquete adicionada ao rascunho (simulação)');
  }

  private toggleTag(name: string): void {
    if (this.taggedPeople.includes(name)) {
      this.taggedPeople = this.taggedPeople.filter((item) => item !== name);
      return;
    }
    this.taggedPeople = [...this.taggedPeople, name];
  }

  private addMockMedia(type: 'image' | 'video', label: string): void {
    const url = type === 'image'
      ? '../assets/images/slider-default.jpeg'
      : '../assets/images/event01.jpg';

    this.attachments = [
      ...this.attachments,
      { type, url, label },
    ];

    this.postGroup.patchValue({
      images: this.attachments.map((item) => item.url),
    });
  }

  public removeAttachment(index: number): void {
    this.attachments = this.attachments.filter((_, i) => i !== index);
    this.postGroup.patchValue({
      images: this.attachments.map((item) => item.url),
    });
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

  public async publish(): Promise<void> {
    if (this.postGroup.get('text')?.invalid && !this.attachments.length) {
      await this.toast.showToast('escreva algo ou adicione uma mídia', true);
      return;
    }

    await this.toast.showToast('publicação criada');
    this.goBack();
  }
}
