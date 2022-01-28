import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER } from 'src/app/constants/mock.const';
import { APP_ROUTES } from 'src/app/constants/routes/routes.const';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user;
  slideOpts = {
    slidesPerView: 1.5,
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  public getData(): void {
    this.user = USER;
    console.log(this.user);
    
  }

  public editProfile(): void {
    this.router.navigate([APP_ROUTES.MAIN, APP_ROUTES.PROFILE_EDIT]);
  }

  public excerptText(text: string): string {
    const cut = text.substring(0, 100);
    return cut;
  }

}
