import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { NewRecipePage } from './new-recipe/new-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesPage
  },
  {
    path: APP_ROUTES.RECIPE_DETAILS,
    component: RecipesPage
  },
  {
    path: APP_ROUTES.NEW_RECIPE,
    component: NewRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
