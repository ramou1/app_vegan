import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventDetailsPage } from 'src/app/pages/main/events/event-details/event-details.page';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss'],
})
export class CardLayoutComponent implements OnInit {

  @Input() type: string = '';
  @Input() data: any;
  public layoutType: string = 'list';
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.type);
    console.log(this.data);
   }

  grid_view() { }

  list_view() { }

  async openRecipe(recipe: any): Promise<void> {
    // const modal = await this.modalCtrl.create({
    //   component: RecipeDetailsPage,
    //   cssClass: 'search-modal',
    //   componentProps: {
    //     // finalize: false,
    //     recipe: recipe
    //   }
    // });

    // return await modal.present();
  }

  public favoriteRecipe(recipe: any): void {
    recipe.favorited = !recipe.favorited;
  }

  async openEvent(event: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EventDetailsPage,
      cssClass: 'search-modal',
      componentProps: {
        // finalize: false,
        event: event
      }
    });

    return await modal.present();
  }

}
