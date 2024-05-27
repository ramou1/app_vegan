import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';
import { ToastService } from 'src/app/services/toast.service';
import { ProfileEditPage } from './profile-edit/profile-edit.page';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { RecipeDetailsPage } from '../recipes/recipe-details/recipe-details.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  public type: string = 'posts';
  public user: any;
  public bgImageUrl: string | null = null;
  public profileImageUrl: string | null = null;
  scrolled: boolean = false;
  slideOpts = {
    slidesPerView: 1.5,
  };

  constructor(private router: Router, private modalCtrl: ModalController, private toast: ToastService, private actionSheetCtrl: ActionSheetController, private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.getUserData();
  }

  public getUserData(): void {
    this.user = USER;
    this.bgImageUrl = this.user.background;
    this.profileImageUrl = this.user.image;
    console.log(this.user);
  }

  public excerptText(text: string): string {
    const cut = text.substring(0, 100);
    return cut;
  }

  onScroll(event: any) {
    this.scrolled = event.detail.scrollTop > 0;
  }

  public openShare(): void {
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  // public openSettings(): void {
  //   this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.PROFILE_EDIT]);
  // }

  async openSettings(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ProfileEditPage,
      cssClass: 'edit-profile-modal',
    });

    return await modal.present();
  }

  async changeImageActions(type: string) {
    const mock_bg_image = 'https://blog.even3.com.br/wp-content/uploads/2020/05/65-imagens-de-destaque_capa-abnt.png';

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'change ' + (type === 'profile' ? 'profile' : 'background') + ' picture',
          handler: () => {
            if (type === 'background') {
              this.user.background = mock_bg_image;
              this.bgImageUrl = mock_bg_image;
            } else {
              // this.user.image = 'https://www.w3schools.com/w3css/img_lights.jpg';
            }
          }
        },
        {
          text: 'view ' + (type === 'profile' ? 'profile' : 'background') + ' picture',
          // handler: () => {
          //   this.openImage(type);
          // }
          // data: {
          //   action: 'share',
          // },
        },
        {
          text: 'delete ' + (type === 'profile' ? 'profile' : 'background') + ' picture',
          handler: () => {
            if (type === 'background') {
              this.user.background = null;
              this.bgImageUrl = null;
            } else {
              this.user.image = null;
              this.profileImageUrl = null;
            }
          },
        },
        // {
        //   text: 'cancelar',
        //   role: 'cancel',
        //   data: {
        //     action: 'cancel',
        //   },
        // },
      ]
    });
    await actionSheet.present();
  }

  // openImage(imageUrl: string) {
  //   imageUrl = 'https://www.w3schools.com/w3css/img_lights.jpg';
  //   // imageUrl = '../assets/images/' +
  //   //   this.user.image ? this.user.image : 'default-user.png';
  //   window.open(imageUrl, '_blank');
  // }

  public changeProfilePicture(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public changeBGPicture(): void {
    //TODO
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  async presentPostActions(post: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'apagar post',
          handler: () => {
            this.deletePost(post);
          }
        },
        {
          text: 'compartilhar post',
        },
        // {
        //   text: 'cancelar',
        //   role: 'cancel',
        //   data: {
        //     action: 'cancel',
        //   },
        // },
      ]
    });
    await actionSheet.present();
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
        post_id: post.post_id
      }
    });

    return await modal.present();
  }

  async repostPost(post: any): Promise<void> {
    // TODO REPOST POST
    console.log("repost", post);
  }

  async deletePost(post: any): Promise<void> {
    // TODO DELETE POST
    console.log("delete", post);
  }

  async openRecipe(recipe: any): Promise<void> {    
    const modal = await this.modalCtrl.create({
      component: RecipeDetailsPage,
      cssClass: 'recipe-modal',
      componentProps: {
        // finalize: false,
        recipe: recipe
      }
    });

    return await modal.present();
  }

}
