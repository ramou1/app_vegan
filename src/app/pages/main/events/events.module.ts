import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { EventDetailsPage } from './event-details/event-details.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewEventPage } from './new-event/new-event.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EventsPage, EventDetailsPage, NewEventPage]
})
export class EventsPageModule {}
