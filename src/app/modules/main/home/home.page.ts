import { Component, OnInit } from '@angular/core';
import { POSTS } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public posts = POSTS;
  public likedIcon = 'heart-outline';

  constructor() { }


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

  // public logScrollStart() {

  // }

}
