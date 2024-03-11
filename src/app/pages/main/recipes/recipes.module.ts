import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';
import { RecipeDetailsPage } from './recipe-details/recipe-details.page';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
    declarations: [RecipesPage, RecipeDetailsPage],
    imports: [
        CommonModule,
        ComponentsModule,
        FormsModule,
        IonicModule,
        RecipesPageRoutingModule,
    ]
})
export class RecipesPageModule {}
