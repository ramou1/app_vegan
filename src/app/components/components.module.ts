import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { RouterModule } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { ReportPostsComponent } from './report-posts/report-posts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ReportProblemsComponent } from './report-problems/report-problems.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    CardLayoutComponent,
    CommentsComponent,
    NotificationsComponent,
    RatingComponent,
    ReportPostsComponent,
    ReportProblemsComponent,
    SearchComponent,
    SkeletonComponent,
    UserProfileComponent,
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
    NotificationsComponent,
    RatingComponent,
    ReportPostsComponent,
    ReportProblemsComponent,
    SearchComponent,
    SkeletonComponent,
    UserProfileComponent,
  ]
})
export class ComponentsModule { }
