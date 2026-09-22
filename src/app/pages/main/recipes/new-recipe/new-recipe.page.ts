import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { RECIPES, USER } from 'src/app/constants/mock.const';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  public recipeGroup: FormGroup;
  public user = USER;
  public imageUrl: string | null = null;
  public selectedImage = 'recipe01.jpg';

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.recipeGroup = this.fb.group({
      creator_id: this.user.id,
      creator: this.user.name,
      creator_image: this.user.image,
      registerDate: new Date().toLocaleDateString('pt-BR'),
      title: [null, [Validators.required]],
      ingredients: [null, [Validators.required]],
      instructions: [null, [Validators.required]],
      cookTime: [null, [Validators.required]],
      servings: [null],
      calories: [null, [Validators.required]],
    });
  }

  async uploadImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'usar imagem de exemplo 1',
          handler: () => this.setImage('recipe01.jpg'),
        },
        {
          text: 'usar imagem de exemplo 2',
          handler: () => this.setImage('recipe02.jpg'),
        },
        {
          text: 'usar imagem de exemplo 3',
          handler: () => this.setImage('recipe03.jpg'),
        },
        {
          text: 'remover imagem',
          role: 'destructive',
          handler: () => {
            this.imageUrl = null;
            this.selectedImage = 'slider-default.jpeg';
          },
        },
        {
          text: 'cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private setImage(file: string): void {
    this.selectedImage = file;
    this.imageUrl = `../assets/images/${file}`;
  }

  public async addRecipe(): Promise<void> {
    if (this.recipeGroup.invalid) {
      await this.toast.showToast('preencha os campos obrigatórios', true);
      return;
    }

    const value = this.recipeGroup.value;
    const ingredients = String(value.ingredients || '')
      .split(/\r?\n/)
      .map((item: string) => item.replace(/^[-•\s]+/, '').trim())
      .filter(Boolean);

    const instructions = String(value.instructions || '')
      .split(/\r?\n/)
      .map((line: string) => line.trim())
      .filter(Boolean)
      .map((line: string) => `<p>${line.replace(/^[-•]\s*/, '')}</p>`)
      .join('');

    const nextId = RECIPES.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    const recipe = {
      id: nextId,
      creator_id: this.user.id,
      creator: this.user.name,
      creator_image: this.user.image,
      registerDate: new Date().toLocaleDateString('pt-BR'),
      images: [this.selectedImage],
      title: String(value.title).toLowerCase(),
      ingredients,
      instructions,
      cookTime: `${value.cookTime} min`,
      servings: Number(value.servings) || 1,
      calories: Number(value.calories) || 0,
      liked: false,
      favorited: false,
      likes: [] as any[],
      comments: [] as any[],
    };

    RECIPES.unshift(recipe);
    USER.recipes = [recipe, ...(USER.recipes || [])];

    await this.toast.showToast('receita criada');
    this.goBack();
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
