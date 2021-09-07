import { IonApp } from '@ionic/react';
import { AnimatePresence } from 'framer-motion'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

import { Routes } from './routes';
import { LoadingStatus } from './components/LoadingStatus'
import { UserProvider } from './contexts/UserContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { useLoading } from './contexts/LoadingContext';

const App: React.FC = () => {
  const { isLoading } = useLoading()
  return(
    <IonApp>
      <UserProvider>
        <ActivityProvider>
          <AnimatePresence exitBeforeEnter>
            {isLoading && ( <LoadingStatus/>)}
          </AnimatePresence>
          <Routes/>
        </ActivityProvider>
      </UserProvider>
    </IonApp>
  )

}

export default App;
