import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { INTEREST_OPTIONS, InterestOption } from 'src/app/constants/interests.const';

@Component({
  selector: 'app-choose-interests',
  templateUrl: './choose-interests.component.html',
  styleUrls: ['./choose-interests.component.scss'],
})
export class ChooseInterestsComponent implements OnInit {
  @Input() selected: InterestOption[] = [];

  public options = INTEREST_OPTIONS;
  public selectedMap = new Set<string>();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    (this.selected || []).forEach((interest) => {
      this.selectedMap.add(interest.description.toLowerCase());
    });
  }

  public isSelected(option: InterestOption): boolean {
    return this.selectedMap.has(option.description.toLowerCase());
  }

  public toggleInterest(option: InterestOption): void {
    const key = option.description.toLowerCase();
    if (this.selectedMap.has(key)) {
      this.selectedMap.delete(key);
    } else {
      this.selectedMap.add(key);
    }
  }

  public save(): void {
    const result = this.options.filter((option) =>
      this.selectedMap.has(option.description.toLowerCase())
    );
    this.modalCtrl.dismiss(result);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
