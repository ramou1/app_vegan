import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ProfileEditPage } from './profile-edit/profile-edit.page';
import { APP_ROUTES } from 'src/app/constants/routes.const';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: APP_ROUTES.PROFILE_EDIT,
    component: ProfileEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
