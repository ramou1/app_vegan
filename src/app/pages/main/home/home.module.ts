import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewPostPage } from './new-post/new-post.page';
import { PostDetailsPage } from './post-details/post-details.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage, NewPostPage, PostDetailsPage]
})
export class HomePageModule {}
