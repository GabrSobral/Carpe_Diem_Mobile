import { IonApp, isPlatform } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

import { Routes } from './routes';
import { UserProvider } from './contexts/UserContext';
import { ActivityProvider } from './contexts/ActivityContext';

const App: React.FC = () => {
  if(isPlatform('mobile')){
    (async () => {
      StatusBar.setOverlaysWebView({ overlay: true });
      await StatusBar.setStyle({ style: Style.Light })
    })()
  }

  return(
    <IonApp>
      <UserProvider>
        <ActivityProvider>
          <Routes/>
        </ActivityProvider>
      </UserProvider>
    </IonApp>
  )
}
export default App;
