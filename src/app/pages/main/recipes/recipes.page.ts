import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { RECIPES } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  
  @ViewChild('recipesSearchbar') searchbar: IonSearchbar;
  public recipes = RECIPES;
  public filteredRecipes: any = [];

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {  
    console.log(this.recipes); 
    this.filteredRecipes = this.recipes;
  }

  public filterList(evt: any): void {
    const searchTerm = evt.target.value;

    if (searchTerm === '') {
      this.filteredRecipes = this.recipes;
    }
    else {
      this.filteredRecipes = this.recipes?.filter((data: any) => {
        return data.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }).slice(0, 15);
    }
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

  public favoriteRecipe(recipe: any): void {
    recipe.favorited = !recipe.favorited;
  }

}
