import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';
// import SwiperCore, { SwiperOptions } from 'swiper';
// import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  public data: any;
  @Input() recipe: any;

  constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.recipe);
  }

  ionViewDidEnter(): void {
    this.getRecipeData();
  }

  public getRecipeData(): void {
    if (this.recipe) {
      this.data = this.recipe;
    }
    else {
      // this.toast.presentErrorToast(EVENTS_TXT.EVENTS_SHOW_ERROR);
      // console.log(EVENTS_TXT.EVENTS_SHOW_ERROR);
      setTimeout(() => {
        this.goBack();
      }, 2000);
    }
  }

  public favoriteRecipe(recipe: any): void {
    recipe.favorited = !recipe.favorited;
  }

  changeSlide() {
    console.log('Slide changed');
  }

  // nextSlide() {
  //   if (this.swiper) {
  //     this.swiper.swiperRef.slideNext();
  //   }
  // }

  // secondButton() {
  //   console.log('Second button clicked');
  // }

  public openShare(): void {
    //TODO SHARE
    // this.toast.presentToast(TOAST_MSG.NOT_IMPLEMENTED, true);
  }

  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

}
