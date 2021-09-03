import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Questionnaire } from './pages/Questionnaire';
import { Home } from './pages/Home';
import { Clock } from './pages/Clock';
import { Profile } from './pages/Profile';
import { Activities } from './pages/Activities';
import { ActivityDetails } from './pages/ActivityDetail';

export const Routes: React.FC = () => {
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        
        <Route exact path="/">
          <Redirect to="/SignIn" />
        </Route>

        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Questionnaire" component={Questionnaire} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Clock" component={Clock} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Activities" component={Activities} />
        <Route exact path="/ActivityDetails" component={ActivityDetails} />

      </IonRouterOutlet>
    </IonReactRouter>
  )
}