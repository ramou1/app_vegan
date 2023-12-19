import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: APP_ROUTES.HOME,
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: APP_ROUTES.PROFILE,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      // {
      //   path: APP_ROUTES.PRIVACY,
      //   component: PrivacyPage,
      // },
      // {
      //   path: APP_ROUTES.TERMS,
      //   component: TermsPage,
      // },
      {
        path: '',
        redirectTo: APP_ROUTES.HOME,
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  declarations: [
    // LoadingPage,
    MainComponent,
    // PrivacyPage,
    // TermsPage,
  ]
})
export class MainModule { }
