import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/constants/routes.const';

@Component({
  selector: 'app-initial-choice',
  templateUrl: './initial-choice.page.html',
  styleUrls: ['./initial-choice.page.scss'],
})
export class InitialChoicePage implements OnInit {

  constructor(private router: Router) { }

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  };

  public introImg = [{}, {}, {}, {}];

  ngOnInit() {
  }

  public gotoLogin(): void {
    this.router.navigate([APP_ROUTES.START, APP_ROUTES.LOGIN]);
  }

  public gotoSignUp(): void {
    this.router.navigate([APP_ROUTES.START, APP_ROUTES.REGISTER]);
  }

}
