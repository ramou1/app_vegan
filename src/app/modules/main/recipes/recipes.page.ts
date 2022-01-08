import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RECIPES } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  public recipes = RECIPES;

  constructor(private router: Router) { }

  ngOnInit() {   
  }

  public openRecipe(recipe: any): void {
    const objToSend: NavigationExtras = {
      queryParams: { event: JSON.stringify(recipe) },
    };

    this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.RECIPE_DETAILS], objToSend);
  }

}
