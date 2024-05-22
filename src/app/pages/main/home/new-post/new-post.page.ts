import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { USER } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {

  public postGroup: FormGroup;
  public user = USER;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.postGroup = this.fb.group({
      creator_id: this.user.id,
      creator: this.user.name,
      creator_image: this.user.image,
      registerDate: new Date(),
      images: [],
      text: [null, [Validators.required]],
      comments: {},
    });
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

  public publish(): void {
    // TODO PUBLISH POST 
    console.log(this.postGroup.value);

    setTimeout(() => {
      this.goBack();
    }, 2000);
  }

}
