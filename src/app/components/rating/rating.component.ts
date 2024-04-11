import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  public ratingGroup: FormGroup;
  public rating = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.ratingGroup = this.fb.group({
      description: [null, [Validators.required]],
    });
  }

  public rate(r: number): void {
    this.rating = r;
    console.log('Rating:', this.rating);
  }

  public send(): void {
  }

}
