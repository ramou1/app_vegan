import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { ReportPostsComponent } from 'src/app/components/report-posts/report-posts.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { NotificationsPage } from './notifications/notifications.page';
import { NewPostPage } from './new-post/new-post.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public posts: any[] = [];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private postService: PostService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.reloadPosts();
  }

  ionViewWillEnter() {
    this.reloadPosts();
  }

  private reloadPosts(): void {
    this.posts = this.postService.getAll();
  }

  public excerptText(text: string): string {
    if (!text) {
      return '';
    }
    return text.length > 160 ? `${text.substring(0, 160).trim()}...` : text;
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

  public likePost(event: Event, post: any): void {
    event.stopPropagation();
    post.liked = !post.liked;
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }
    if (post.liked) {
      post.likes.push({ user_id: 4 });
    } else if (post.likes.length) {
      post.likes.pop();
    }
  }

  async openNotifications(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NotificationsPage,
      cssClass: 'notifications-modal',
    });

    return await modal.present();
  }

  async openSearch(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SearchComponent,
      cssClass: 'search-modal',
    });

    return await modal.present();
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
          text: 'compartilhar post',
        },
        {
          text: 'denunciar post',
          handler: () => {
            this.reportPost(post);
          },
        },
        {
          text: 'deixar de seguir',
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async reportPost(post: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ReportPostsComponent,
      cssClass: 'report-posts-modal',
      componentProps: {
        post_id: post.post_id,
      },
    });

    return await modal.present();
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

  async openRating(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RatingComponent,
      cssClass: 'rating-modal',
    });

    return await modal.present();
  }

  async openUserProfile(event: Event, userId: any): Promise<void> {
    event.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: UserProfileComponent,
      cssClass: 'user-profile-modal',
      componentProps: {
        userId,
      },
    });

    return await modal.present();
  }

  async newPost(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: NewPostPage,
      cssClass: 'post-modal',
    });

    await modal.present();
    await modal.onDidDismiss();
    this.reloadPosts();
  }
}
