import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { APP_ROUTES } from 'src/app/constants/routes.const';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss'],
})
export class CardLayoutComponent implements OnInit {

  @Input() type: string = '';
  @Input() data: any;
  public layoutType: string = 'list';

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  grid_view() { }

  list_view() { }

  async openRecipe(recipe: any): Promise<void> {
  }

  public favoriteRecipe(recipe: any): void {
    recipe.favorited = !recipe.favorited;
  }

  public openEvent(event: any): void {
    this.modalCtrl.dismiss().catch(() => undefined);
    this.router.navigate([
      '/',
      APP_ROUTES.MAIN,
      APP_ROUTES.EVENTS,
      APP_ROUTES.EVENT_DETAILS,
      event.id
    ]);
  }

}
