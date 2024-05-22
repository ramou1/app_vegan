import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {

  public recipeGroup: FormGroup;
  public ending: boolean = false;
  public user = USER;
  public imageUrl: string | null = null;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.recipeGroup = this.fb.group({
      creator_id: this.user.id,
      creator: this.user.name,
      creator_image: this.user.image,
      registerDate: new Date(),
      image: [],
      title: [null, [Validators.required]],
      ingredients: [null, [Validators.required]],
      instructions: [null, [Validators.required]],
      cookTime: [null, [Validators.required]],
      servings: [null],
      calories: [null, [Validators.required]],
      likes: 0,
      comments: {},
    });
  }

  async uploadImage() {
    const mock_image = 'https://doity.com.br/blog/app/uploads/2023/03/Topo-DoityCapa-1.png';

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'upload image',
          handler: () => {
            // this.openImage(type);

            // TODO: UPLOAD IMAGE
            this.recipeGroup.get('image')?.setValue(mock_image);
            this.imageUrl = mock_image;
          }
        },
        {
          text: 'delete image',
          handler: () => {
            this.imageUrl = null;
          },
          role: 'cancel',
          // data: {
          //   action: 'cancel',
          // },
        },
      ]
    });
    await actionSheet.present();
  }

  public removeEnding(): void {
    this.ending = false;
    this.recipeGroup.get('endingHour')?.reset(); // Opcional: limpar o valor do campo ao removê-lo
  }

  public addRecipe(): void {
    // TODO NEW RECIPE
    console.log(this.recipeGroup.value);

    setTimeout(() => {
      this.goBack();
    }, 3000);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
