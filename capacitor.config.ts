import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eisos.wesensorble',
  appName: 'WE-SensorBLE',
  webDir: 'www',
  plugins : {
    Keyboard: {
      resizeOnFullScreen: false
    },
    EdgeToEdge: {
      backgroundColor: "#e3000b",
      navigationBarColor: "#00000000"
    },
    SystemBars: {
      insetsHandling: 'disable'
    }
  }
};

export default config;
