import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  public eventGroup: FormGroup;
  public ending: boolean = false;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.eventGroup = this.fb.group({
      creator: [null],
      creator_image: [null],
      registerDate: new Date(),
      image: [null, [Validators.required]],
      title: [null, [Validators.required]],
      local: [null, [Validators.required]],
      date: [null, [Validators.required]],
      startingHour: [null, [Validators.required]],
      endingHour: [null, [Validators.required]],
      description: [null, [Validators.required]],
      confirmed: 0,
      comments: {},
    });
  }

  public addEvent(): void {
    // TODO NEW EVENT
    console.log(this.eventGroup.value);

    setTimeout(() => {
      this.goBack();
    }, 3000);
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }
}
