import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { STORAGE } from './constants/storage.const';
import { StorageService } from './services/storage.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private storage: StorageService) {
    this.initializeApp();
  }

  initializeApp() {
    this.applyStoredTheme();

    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({ color: '#00000080' });
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Light });
    });
  }

  private applyStoredTheme(): void {
    const theme = this.storage.getItem(STORAGE.THEME) || 'light';
    document.body.classList.toggle('dark', theme === 'dark');
  }
}
