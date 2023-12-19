import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes.const';

const routes: Routes = [
  {
    path: APP_ROUTES.START,
    loadChildren: () => import('./pages/start/start.module').then(m => m.StartModule)
  },
  {
    path: APP_ROUTES.MAIN,
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    // redirectTo: APP_ROUTES.MAIN,
    redirectTo: APP_ROUTES.START,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
