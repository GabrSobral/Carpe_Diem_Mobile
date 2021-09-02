import { IonApp } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { Routes } from './routes';
import { UserProvider } from './contexts/UserContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { LoadingProvider } from './contexts/LoadingContext';

const App: React.FC = () => (
  <IonApp>
    <UserProvider>
      <ActivityProvider>
        <LoadingProvider>
          <Routes/>
        </LoadingProvider>
      </ActivityProvider>
    </UserProvider>
  </IonApp>
);

export default App;
