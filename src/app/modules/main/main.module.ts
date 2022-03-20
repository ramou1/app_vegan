import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { APP_ROUTES } from "src/app/constants/routes/routes.const";
import { EventDetailsPage } from "./event-details/event-details.page";
import { HomePage } from "./home/home.page";
import { MainComponent } from "./main.component";
import { EventsPage } from "./events/events.page";
import { MapPage } from "./map/map.page";
import { ProfileEditPage } from "./profile-edit/profile-edit.page";
import { RecipesPage } from "./recipes/recipes.page";
import { ProfilePage } from "./profile/profile.page";
import { RecoverPasswordPage } from "./recover-password/recover-password.page";
import { RecipeDetailsPage } from "./recipe-details/recipe-details.page";
import { SearchPage } from "./search/search.page";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: APP_ROUTES.HOME,
        component: HomePage
      },
      {
        path: APP_ROUTES.SEARCH,
        component: SearchPage
      },
      {
        path: APP_ROUTES.EVENTS,
        component: EventsPage,
      },
      {
        path: APP_ROUTES.EVENT_DETAILS,
        component: EventDetailsPage
      },
      {
        path: APP_ROUTES.MAP,
        component: MapPage
      },
      {
        path: APP_ROUTES.PROFILE,
        component: ProfilePage
      },
      {
        path: APP_ROUTES.PROFILE_EDIT,
        component: ProfileEditPage
      },
      {
        path: APP_ROUTES.RECIPES,
        component: RecipesPage
      },
      {
        path: APP_ROUTES.RECIPE_DETAILS,
        component: RecipeDetailsPage
      },
      {
        path: APP_ROUTES.RECOVER_PASSWORD,
        component: RecoverPasswordPage
      },
      {
        path: "",
        redirectTo: APP_ROUTES.HOME,
        pathMatch: "full",
      },
    ]
  },

];

@NgModule({
  declarations: [
    MainComponent,
    HomePage,
    SearchPage,
    EventsPage,
    EventDetailsPage,
    MapPage,
    ProfilePage,
    ProfileEditPage,
    RecipesPage,
    RecipeDetailsPage,
    RecoverPasswordPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})

export class MainModule { }