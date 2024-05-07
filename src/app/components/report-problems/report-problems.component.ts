import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-problems',
  templateUrl: './report-problems.component.html',
  styleUrls: ['./report-problems.component.scss'],
})
export class ReportProblemsComponent implements OnInit {

  public reportGroup: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.reportGroup = this.fb.group({
      type: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

  public sendReport(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

}