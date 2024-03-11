import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardLayoutComponent,
    CommentsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CardLayoutComponent,
    CommentsComponent,
    SearchComponent
  ]
})
export class ComponentsModule { }
