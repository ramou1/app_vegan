import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { REPORTS } from 'src/app/constants/reports.const';

@Component({
  selector: 'app-report-posts',
  templateUrl: './report-posts.component.html',
  styleUrls: ['./report-posts.component.scss'],
})
export class ReportPostsComponent  implements OnInit {
  
  public reports = REPORTS;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  public goBack(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

  public chooseReport(report: any): void {
    this.reports.forEach((r: any) => {
      r.selected = false;
    });
    report.selected = true;
  }

  public sendReport(): void {
    this.modalCtrl.dismiss().catch((err) => {
      // console.log(err);
    });
  }

}