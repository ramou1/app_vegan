import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { POSTS } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public posts = POSTS;
  public likedIcon = 'heart-outline';

  constructor(private router: Router, private modalCtrl: ModalController) { }


  ngOnInit() {    
  }

  public excerptText(text: string): string {
    const cut = text.substring(0, 100);
    return cut;
  }

  public likePost(post: any): void {
    post.liked = !post.liked;    
  }

  public getContent() {
    return document.querySelector('ion-content');
  }

  public scrollToTop(): void {
    this.getContent().scrollToTop(500);
  }

  async openSearch(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      cssClass: 'search-modal',
    });

    return await modal.present();
  }

}
