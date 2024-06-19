import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
// import { TranslateService } from '@ngx-translate/core';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  // constructor(private translate: TranslateService) {
  //   this.initializeApp();
  //   const browserLang = translate.getBrowserLang();
  //   translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      // StatusBar.setBackgroundColor({ color: '#ffffff' });
      // StatusBar.setBackgroundColor({ color: 'transparent' });
      StatusBar.setBackgroundColor({ color: '#00000080' });
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Light }); // ou Style.Dark conforme a necessidade
    });
  }
}
