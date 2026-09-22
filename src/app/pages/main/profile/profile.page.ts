import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { RECIPES, USER } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { PostService } from 'src/app/services/post.service';
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
  public posts: any[] = [];
  public recipes: any[] = [];
  public bgImageUrl: string | null = null;
  public profileImageUrl: string | null = null;
  public viewingImage: string | null = null;
  public scrolled = false;
  private pendingImageType: 'profile' | 'background' | null = null;

  constructor(
    private modalCtrl: ModalController,
    private toast: ToastService,
    private actionSheetCtrl: ActionSheetController,
    private postService: PostService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getUserData();
  }

  ionViewWillEnter() {
    this.getUserData();
  }

  public getUserData(): void {
    this.user = USER;
    this.bgImageUrl = this.user.background || null;
    this.profileImageUrl = this.user.image || null;
    this.posts = this.postService.getByUser(USER.id);
    const ownRecipes = RECIPES.filter((recipe) => Number(recipe.creator_id) === Number(USER.id));
    const profileRecipes = this.user.recipes || [];
    const merged = [...ownRecipes, ...profileRecipes];
    this.recipes = merged.filter(
      (recipe, index, arr) => arr.findIndex((item) => Number(item.id) === Number(recipe.id)) === index
    );
  }

  public excerptText(text: string): string {
    if (!text) {
      return '';
    }
    return text.length > 160 ? `${text.substring(0, 160).trim()}...` : text;
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

  public openPost(post: any): void {
    this.router.navigate([
      '/',
      APP_ROUTES.MAIN,
      APP_ROUTES.HOME,
      APP_ROUTES.POST_DETAILS,
      post.post_id,
    ]);
  }

  async presentPostActions(event: Event, post: any) {
    event.stopPropagation();
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: post.saved ? 'remover dos salvos' : 'salvar post',
          handler: () => {
            const saved = this.postService.toggleSave(post);
            this.toast.showToast(saved ? 'post salvo' : 'post removido dos salvos');
          },
        },
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

  public likePost(event: Event, post: any): void {
    event.stopPropagation();
    post.liked = !post.liked;
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }
    if (post.liked) {
      post.likes.push({ user_id: USER.id });
    } else if (post.likes.length) {
      post.likes.pop();
    }
  }

  async openComments(event: Event, post: any): Promise<void> {
    event.stopPropagation();
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

  async repostPost(event: Event, post: any): Promise<void> {
    event.stopPropagation();
    post.reposts = this.postService.repost(post);
    await this.toast.showToast('repost feito');
  }

  async deletePost(post: any): Promise<void> {
    this.posts = this.posts.filter((item: any) => item.post_id !== post.post_id);
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
