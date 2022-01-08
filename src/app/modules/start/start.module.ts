import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { APP_ROUTES } from "src/app/constants/routes/routes.const";
import { InitialChoicePage } from "./initial-choice/initial-choice.page";
import { LoginPage } from "./login/login.page";
import { RegisterPage } from "./register/register.page";


const INITIAL_ROUTE = APP_ROUTES.INITIAL_CHOICE

const routes: Routes = [
  {
    path: APP_ROUTES.INITIAL_CHOICE,
    component: InitialChoicePage,
  },
  {
    path: APP_ROUTES.LOGIN,
    component: LoginPage,
    // canActivate: [AdhesionTermGuard]
  },
  {
    path: APP_ROUTES.REGISTER,
    component: RegisterPage,
  },
  {
    path: '',
    redirectTo: INITIAL_ROUTE,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    InitialChoicePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})

export class StartModule { }