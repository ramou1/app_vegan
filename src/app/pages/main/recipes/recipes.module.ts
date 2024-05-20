import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';
import { RecipeDetailsPage } from './recipe-details/recipe-details.page';
import { ComponentsModule } from "../../../components/components.module";
import { NewRecipePage } from './new-recipe/new-recipe.page';

@NgModule({
    declarations: [RecipesPage, RecipeDetailsPage, NewRecipePage],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicModule,
        RecipesPageRoutingModule,
        ReactiveFormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesPageModule {}
