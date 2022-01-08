import { Component, OnInit } from '@angular/core';
import { POSTS } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public posts = POSTS;

  constructor() { }


  ngOnInit() {
  }

  public excerptText(text: string): string {
    const cut = text.substring(0, 100);
    return cut;
  }

}
