import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  public ratingGroup: FormGroup;
  public rating: number = 0;
  public selected: string[] = [];
  public chips = [{ title: 'design atraente', slug: 'design_atraente' }, { title: 'bons restaurantes', slug: 'bons_restaurantes' }]

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.ratingGroup = this.fb.group({
      description: [null, [Validators.required]],
    });
  }

  public rate(value: number) {
    if (this.rating === value) {
      this.rating = 0;
    } else {
      this.rating = value;
    }
    console.log('Rating:', this.rating);
  }

  toggleChip(chip: string) {
    if (this.selected.includes(chip)) {
      // Se o chip já estiver selecionado, remova-o
      this.selected = this.selected.filter(selectedChip => selectedChip !== chip);
    } else {
      // Caso contrário, adicione-o à lista de chips selecionados
      this.selected.push(chip);
    }

    console.log('Selected:', this.selected);
  }

  public send(): void {
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

}
