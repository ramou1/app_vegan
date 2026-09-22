import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { USER, USERS } from 'src/app/constants/mock.const';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() user: any;
  @Input() userId: number | string;

  public profile: any;
  public posts: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private postService: PostService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const id = this.userId ?? this.user?.id;
    const found: any =
      USERS.find((item) => Number(item.id) === Number(id)) ||
      (Number(USER.id) === Number(id) ? USER : null);

    this.profile = found
      ? {
          ...found,
          image: found.image || 'default-user.png',
          following: found.following || [],
          followers: found.followers || [],
          trophies: found.trophies || [],
          interests: found.interests || USER.interests || [],
          description: found.description || 'perfil da comunidade veggie',
        }
      : {
          id,
          name: 'usuário',
          username: 'usuario',
          image: 'default-user.png',
          following: [],
          followers: [],
          trophies: [],
          interests: [],
        };

    this.posts = this.postService.getByUser(Number(this.profile.id));
  }

  async presentProfileActions() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'compartilhar perfil',
          handler: () => {
            this.shareProfile();
          },
        },
        {
          text: 'denunciar perfil',
        },
        {
          text: 'bloquear perfil',
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  public shareProfile(): void {
    this.toast.showToast('link do perfil copiado (simulação)');
  }

  public followUser(): void {
    this.toast.showToast(`seguindo ${this.profile.name}`);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
