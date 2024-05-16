import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';
import { EventDetailsPage } from './event-details/event-details.page';
import { APP_ROUTES } from 'src/app/constants/routes.const';
import { NewEventPage } from './new-event/new-event.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: APP_ROUTES.EVENT_DETAILS,
    component: EventDetailsPage
  },
  {
    path: APP_ROUTES.NEW_EVENT,
    component: NewEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
