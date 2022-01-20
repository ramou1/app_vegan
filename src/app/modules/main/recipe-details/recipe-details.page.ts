import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  // public data: RecipesResponseData[] = [];
  public data;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.getRecipeData();
  }

  public getRecipeData(): void {
    const params = this.route.snapshot.queryParams;
    if (params.event) {
      this.data = JSON.parse(params.event);
      console.log(this.data);
      
    }
    else {
      // this.toast.presentErrorToast(EVENTS_TXT.EVENTS_SHOW_ERROR);
      // console.log(EVENTS_TXT.EVENTS_SHOW_ERROR);
      setTimeout(() => {
        this.router.navigateByUrl(APP_ROUTES.MAIN);
      }, 2000);
    }
  }

  public goBack(): void {
    this.router.navigate[(APP_ROUTES.MAIN, APP_ROUTES.RECIPES)];
  }

}
