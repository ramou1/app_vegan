import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
// public data: RecipesResponseData[] = [];
public data: any;
@Input() recipe: any;
// @Input() qtdGarrafas: number = 0;
// @Input() finalize: boolean = false;

constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController) { }

ngOnInit() {
  console.log(this.recipe);
}

ionViewDidEnter(): void {
  this.getRecipeData();
}

public getRecipeData(): void {
  if (this.recipe) {
    this.data = this.recipe;      
  }
  else {
    // this.toast.presentErrorToast(EVENTS_TXT.EVENTS_SHOW_ERROR);
    // console.log(EVENTS_TXT.EVENTS_SHOW_ERROR);
    setTimeout(() => {
      this.goBack();
    }, 2000);
  }
}


public goBack(): void {
  this.modalCtrl.dismiss().catch((err) => {
    // console.log(err);
  });
}

}
