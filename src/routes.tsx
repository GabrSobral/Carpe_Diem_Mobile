import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Questionnaire } from './pages/Questionnaire';

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

      </IonRouterOutlet>
    </IonReactRouter>
  )
}