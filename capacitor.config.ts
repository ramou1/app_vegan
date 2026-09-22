import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.veggie.app',
  appName: 'veggie',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
