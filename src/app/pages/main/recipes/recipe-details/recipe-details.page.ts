import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getRecipeData();
  }

  ionViewDidEnter(): void {
    this.getRecipeData();
  }

  public get ingredientList(): string[] {
    const raw = this.recipe?.ingredients;
    if (!raw) {
      return [];
    }
    if (Array.isArray(raw)) {
      return raw.map((item) => String(item).trim()).filter(Boolean);
    }
    return String(raw)
      .split(/\r?\n|,/)
      .map((item) => item.replace(/^[-•\s]+/, '').trim())
      .filter(Boolean);
  }

  public get instructionsHtml(): string {
    const raw = this.recipe?.instructions || '';
    if (!raw) {
      return '';
    }

    const text = String(raw).trim();
    if (text.includes('<br') || text.includes('<p') || text.includes('<li')) {
      return text;
    }

    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<p>${line.replace(/^[-•]\s*/, '')}</p>`)
      .join('');
  }

  public getRecipeData(): void {
    if (this.recipe) {
      this.data = this.recipe;
      return;
    }

    setTimeout(() => {
      this.goBack();
    }, 2000);
  }

  public favoriteRecipe(recipe: any): void {
    recipe.favorited = !recipe.favorited;
  }

  changeSlide() {}

  public openShare(): void {}

  public goBack(): void {
    this.modalCtrl.dismiss().catch(() => undefined);
  }
}
