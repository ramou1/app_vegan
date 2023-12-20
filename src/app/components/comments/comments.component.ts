import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent  implements OnInit {

  @Input() comments: any = [];
  @Input() post_id: number = 0;
  public commentForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private toast: ToastService) { }

  ngOnInit() {
    console.log(this.comments);
    this.buildForm();
  }

  private buildForm(): void {
    this.commentForm = this.fb.group({
      comment: [null, [Validators.required]],
      file: [null],
      file_title: [null],
    });
  }

  public sendComment(post_id: any): void {
    const formData = this.commentForm.value;
    formData.comment = this.convertLineBreak(formData.comment);
    

    // this.post.sendComment(evento_id, formData).subscribe((res) => {
      // this.toast.presentToast(TOAST_MSG.SEND_COMMENT_SUCCESS);
      this.commentForm.reset();
      setTimeout(() => {
        // location.reload();
      }, 1500);
    // }, (err) => {
    //   this.toast.presentToast(TOAST_MSG.SEND_COMMENT_ERROR, true);
    // });
  }

  public convertLineBreak(text: string): string {
    return text.replace(/\n/g, "<br>");
  }

  public goBack(): void {
    this.modalCtrl.dismiss();
  }

}
