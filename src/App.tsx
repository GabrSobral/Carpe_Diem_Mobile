import { IonApp } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

import { Routes } from './routes';
import { UserProvider } from './contexts/UserContext';
import { ActivityProvider } from './contexts/ActivityContext';

const App: React.FC = () => {
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
