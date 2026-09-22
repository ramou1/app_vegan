import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';
import { EventDetailsPage } from './event-details/event-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewEventPage } from './new-event/new-event.page';
import { NewOrganizationPage } from '../organization/new-organization/new-organization.page';
import { EventAttendeesComponent } from 'src/app/components/event-attendees/event-attendees.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    EventsPage,
    EventDetailsPage,
    NewEventPage,
    NewOrganizationPage,
    EventAttendeesComponent,
  ]
})
export class EventsPageModule {}
