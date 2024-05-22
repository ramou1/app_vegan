import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { NewPostPage } from './new-post/new-post.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: APP_ROUTES.NEW_POST,
    component: NewPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
