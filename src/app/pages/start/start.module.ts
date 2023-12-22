import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { STORAGE } from 'src/app/constants/storage.const';
import { RouterModule, Routes } from '@angular/router';
import { InitialChoicePage } from './initial-choice/initial-choice.page';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { RecoverPasswordPage } from './recover-password/recover-password.page';
import { OnboardingPage } from './onboarding/onboarding.page';

// const SHOW_ONBOARDING = localStorage.getItem(STORAGE.SHOW_ONBOARDING);
// const INITIAL_ROUTE = SHOW_ONBOARDING === '0' ? APP_ROUTES.INITIAL_CHOICE : APP_ROUTES.ONBOARDING;
const INITIAL_ROUTE = APP_ROUTES.INITIAL_CHOICE;
// const INITIAL_ROUTE = APP_ROUTES.ONBOARDING;

const routes: Routes = [
  {
    path: APP_ROUTES.ONBOARDING,
    component: OnboardingPage,
  },
  {
    path: APP_ROUTES.INITIAL_CHOICE,
    component: InitialChoicePage
  },
  {
    path: APP_ROUTES.LOGIN,
    component: LoginPage,
  },
  {
    path: APP_ROUTES.REGISTER,
    component: RegisterPage,
  },
  {
    path: APP_ROUTES.RECOVER_PASSWORD,
    component: RecoverPasswordPage,
  },
  {
    path: '',
    redirectTo: INITIAL_ROUTE,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InitialChoicePage,
    LoginPage,
    OnboardingPage,
    RegisterPage,
    RecoverPasswordPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StartModule { }
