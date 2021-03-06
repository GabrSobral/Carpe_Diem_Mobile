import { createElement } from 'react';
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
import { useUsers } from './contexts/UserContext';
import { ChangePassword } from './pages/ChangePassword';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

export const Routes: React.FC = () => {
  const { isAuthenticated, user } = useUsers()

  const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
     (isAuthenticated && user)
        ? (user.hasAnswered ? 
          createElement(component, props) : 
          <Redirect to={{ pathname: "/Questionnaire", state: { from: props.location } }}/>)
        : <Redirect to={{ pathname: "/SignIn", state: { from: props.location } }} />
    )
    return <Route {...rest} render={routeComponent}/>;
  }

  return(
    <IonReactRouter>
      <IonRouterOutlet>
        
        <Route exact path="/">
          <Redirect to="/SignIn" />
        </Route>

        <Route 
          exact path="/SignIn" 
          render={() => (isAuthenticated && user) ? 
            <Redirect to={'/Home'}/> : 
            <SignIn/>}
        />
        <Route 
          exact path="/SignUp" 
          render={() => (isAuthenticated && user) ? 
            <Redirect to={'/Home'}/> : 
            <SignUp/>}
        />

        <Route exact path="/Questionnaire" component={ Questionnaire} />
        <PrivateRoute exact path="/Home" component={Home} />
        <PrivateRoute exact path="/Clock" component={Clock} />
        <PrivateRoute exact path="/Profile" component={Profile} />
        <PrivateRoute exact path="/Activities" component={Activities} />
        <PrivateRoute exact path="/ActivityDetails" component={ActivityDetails} />
        <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/ResetPassword" component={ResetPassword} />

      </IonRouterOutlet>
    </IonReactRouter>
  )
}