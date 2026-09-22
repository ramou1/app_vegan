import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { USER } from 'src/app/constants/mock.const';
import { ToastService } from 'src/app/services/toast.service';
import { RecipeDetailsPage } from '../recipes/recipe-details/recipe-details.page';
import { ProfileEditPage } from './profile-edit/profile-edit.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('galleryInput') galleryInput!: ElementRef<HTMLInputElement>;

  public type = 'posts';
  public user: any;
  public bgImageUrl: string | null = null;
  public profileImageUrl: string | null = null;
  public viewingImage: string | null = null;
  public scrolled = false;
  private pendingImageType: 'profile' | 'background' | null = null;

  constructor(
    private modalCtrl: ModalController,
    private toast: ToastService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async ngOnInit() {
    this.getUserData();
  }

  public getUserData(): void {
    this.user = USER;
    this.bgImageUrl = this.user.background || null;
    this.profileImageUrl = this.user.image || null;
  }

  public excerptText(text: string): string {
    return text.substring(0, 100);
  }

  onScroll(event: any) {
    this.scrolled = event.detail.scrollTop > 0;
  }

  public openShare(): void {}

  async openSettings(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ProfileEditPage,
      cssClass: 'edit-profile-modal',
    });

    await modal.present();
    await modal.onDidDismiss();
    this.getUserData();
  }

  public getProfileSrc(): string {
    return this.resolveImageSrc(this.profileImageUrl || this.user?.image, 'default-user.png');
  }

  public getBackgroundSrc(): string {
    return this.resolveImageSrc(this.bgImageUrl || this.user?.background, 'background-default.png');
  }

  private resolveImageSrc(image: string | null | undefined, fallback: string): string {
    if (!image) {
      return `../assets/images/${fallback}`;
    }
    if (
      image.startsWith('data:') ||
      image.startsWith('blob:') ||
      image.startsWith('http://') ||
      image.startsWith('https://') ||
      image.startsWith('../') ||
      image.startsWith('/')
    ) {
      return image;
    }
    return `../assets/images/${image}`;
  }

  async changeImageActions(type: 'profile' | 'background') {
    const label = type === 'profile' ? 'foto de perfil' : 'foto de capa';

    const actionSheet = await this.actionSheetCtrl.create({
      header: label,
      buttons: [
        {
          text: `trocar ${label}`,
          handler: () => {
            this.openGallery(type);
          },
        },
        {
          text: `ver ${label}`,
          handler: () => {
            this.viewImage(type);
          },
        },
        {
          text: `apagar ${label}`,
          role: 'destructive',
          handler: () => {
            this.confirmDeleteImage(type);
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

  private openGallery(type: 'profile' | 'background'): void {
    this.pendingImageType = type;
    this.galleryInput?.nativeElement?.click();
  }

  public onGallerySelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || !this.pendingImageType) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;

      if (this.pendingImageType === 'background') {
        this.user.background = result;
        this.bgImageUrl = result;
        USER.background = result;
      } else {
        this.user.image = result;
        this.profileImageUrl = result;
        USER.image = result;
      }

      this.pendingImageType = null;
      input.value = '';
      this.toast.showToast('imagem atualizada (não salva no servidor)');
    };

    reader.readAsDataURL(file);
  }

  private viewImage(type: 'profile' | 'background'): void {
    const src =
      type === 'profile'
        ? this.getProfileSrc()
        : this.getBackgroundSrc();

    this.viewingImage = src;
  }

  public closeImageViewer(): void {
    this.viewingImage = null;
  }

  private async confirmDeleteImage(type: 'profile' | 'background'): Promise<void> {
    const label = type === 'profile' ? 'foto de perfil' : 'foto de capa';
    const confirmed = await this.toast.confirm(
      `tem certeza que deseja apagar a ${label}?`,
      `apagar ${label}`,
      'apagar',
      'cancelar'
    );

    if (!confirmed) {
      return;
    }

    if (type === 'background') {
      this.user.background = null;
      this.bgImageUrl = null;
      USER.background = '';
    } else {
      this.user.image = null;
      this.profileImageUrl = null;
      USER.image = '';
    }

    await this.toast.showToast(`${label} removida`);
  }

  async presentPostActions(post: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'apagar post',
          role: 'destructive',
          handler: () => {
            this.confirmDeletePost(post);
          },
        },
        {
          text: 'compartilhar post',
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private async confirmDeletePost(post: any): Promise<void> {
    const confirmed = await this.toast.confirm(
      'tem certeza que deseja apagar este post?',
      'apagar post',
      'apagar',
      'cancelar'
    );

    if (!confirmed) {
      return;
    }

    this.deletePost(post);
  }

  public likePost(post: any): void {
    post.liked = !post.liked;
    post.liked ? post.likes.length++ : post.likes.length--;
  }

  async openComments(post: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CommentsComponent,
      cssClass: 'comments-modal',
      componentProps: {
        comments: post.comments,
        post_id: post.post_id,
      },
    });

    return await modal.present();
  }

  async repostPost(post: any): Promise<void> {
    console.log('repost', post);
  }

  async deletePost(post: any): Promise<void> {
    this.user.posts = (this.user.posts || []).filter(
      (item: any) => item.post_id !== post.post_id
    );
    USER.posts = this.user.posts;
    await this.toast.showToast('post apagado');
  }

  async openRecipe(recipe: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RecipeDetailsPage,
      cssClass: 'recipe-modal',
      componentProps: {
        recipe,
      },
    });

    return await modal.present();
  }
}
