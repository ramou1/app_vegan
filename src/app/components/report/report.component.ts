import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

  public send(): void {
  }

}
