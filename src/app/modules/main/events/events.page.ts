import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EVENTS } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public events = EVENTS;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public openEvent(event: any): void {
    const objToSend: NavigationExtras = {
      queryParams: { event: JSON.stringify(event) },
    };

    this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.EVENT_DETAILS], objToSend);
  }

  public checkInterested(event: any): void {

  }

}
