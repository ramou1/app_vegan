import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/constants/routes.const';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  public index: number = 0;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  async changeSlide() {
    this.index = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  async previousSlide() {
    this.swiperRef?.nativeElement.swiper.slidePrev();
  }

  async nextSlide() {
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  async skipOnBoarding() {
    // this.storage.addItem(STORAGE.SHOW_ONBOARDING, "0");
    await this.router.navigate([`${APP_ROUTES.START}/${APP_ROUTES.INITIAL_CHOICE}`]);
  }

}


