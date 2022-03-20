import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes/routes.const';

const routes: Routes = [
  {
    path: APP_ROUTES.START,
    loadChildren: () => import('./modules/start/start.module').then(m => m.StartModule)
  },
  {
    path: APP_ROUTES.MAIN,
    loadChildren: () => import('./modules/main/main.module').then( m => m.MainModule)
  },
  {
    path: "",
    redirectTo: APP_ROUTES.START,
    pathMatch: "full",
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
