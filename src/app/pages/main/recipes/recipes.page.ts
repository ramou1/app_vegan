import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RECIPES } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  public recipes = RECIPES;

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {   
  }

  async openRecipe(recipe: any): Promise<void> {
    // const modal = await this.modalCtrl.create({
    //   component: RecipeDetailsPage,
    //   cssClass: 'search-modal',
    //   componentProps: {
    //     // finalize: false,
    //     recipe: recipe
    //   }
    // });

    // return await modal.present();
  }

  public likeRecipe(recipe: any): void {
    recipe.liked = !recipe.liked;    
  }

}
