import { IonApp } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

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
