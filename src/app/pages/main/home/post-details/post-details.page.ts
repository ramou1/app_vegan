import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { ReportPostsComponent } from 'src/app/components/report-posts/report-posts.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  public post: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private postService: PostService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  ionViewWillEnter(): void {
    this.loadPost();
  }

  private loadPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const found = id ? this.postService.getById(id) : null;

    if (!found) {
      this.toast.showToast('post não encontrado', true);
      setTimeout(() => this.goBack(), 1000);
      return;
    }

    this.post = found;
  }

  public likePost(event?: Event): void {
    event?.stopPropagation();
    this.post.liked = !this.post.liked;
    if (!Array.isArray(this.post.likes)) {
      this.post.likes = [];
    }
    if (this.post.liked) {
      this.post.likes.push({ user_id: 4 });
    } else if (this.post.likes.length) {
      this.post.likes.pop();
    }
  }

  public async openComments(event?: Event): Promise<void> {
    event?.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: CommentsComponent,
      cssClass: 'comments-modal',
      componentProps: {
        comments: this.post.comments,
        post_id: this.post.post_id,
      },
    });
    await modal.present();
  }

  public async repostPost(event?: Event): Promise<void> {
    event?.stopPropagation();
    const count = this.postService.repost(this.post);
    this.post.reposts = count;
    await this.toast.showToast('repost feito');
  }

  public async presentPostActions(event?: Event): Promise<void> {
    event?.stopPropagation();
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: this.post.saved ? 'remover dos salvos' : 'salvar post',
          handler: () => {
            const saved = this.postService.toggleSave(this.post);
            this.post.saved = saved;
            this.toast.showToast(saved ? 'post salvo' : 'post removido dos salvos');
          },
        },
        {
          text: 'compartilhar post',
        },
        {
          text: 'denunciar post',
          handler: () => {
            this.reportPost();
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

  private async reportPost(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ReportPostsComponent,
      cssClass: 'report-posts-modal',
      componentProps: {
        post_id: this.post.post_id,
      },
    });
    await modal.present();
  }

  public async openUserProfile(event?: Event): Promise<void> {
    event?.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: UserProfileComponent,
      cssClass: 'user-profile-modal',
      componentProps: {
        userId: this.post.creator_id,
      },
    });
    await modal.present();
  }

  public goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/', APP_ROUTES.MAIN, APP_ROUTES.HOME]);
    }
  }
}
