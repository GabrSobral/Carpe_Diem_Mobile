import { createElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { FiList, FiUser, FiHome} from 'react-icons/fi'

import styles from './styles/routes.module.scss'

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
  const { user } = useUsers()

  const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
     ( user )
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
          render={() => (user) ? 
            <Redirect to={'/tabs/Home'}/> : 
            <SignIn/>}
        />
        <Route 
          exact path="/SignUp" 
          render={() => (user) ? 
            <Redirect to={'/tabs/Home'}/> : 
            <SignUp/>}
        />
        <Route exact path="/Questionnaire" component={Questionnaire} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/ResetPassword" component={ResetPassword} />
        <PrivateRoute exact path="/Clock" component={Clock} />
        <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />

        <Route
          path="/tabs"
          render={() => (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/tabs/Home" component={Home} />
                <Route exact path="/tabs/Profile" component={Profile} />
                <Route exact path="/tabs/Activities" component={Activities} />
                <Route exact path="/tabs/ActivityDetails" component={ActivityDetails} />
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className={styles.container}>
                <IonTabButton tab="activities" href="/tabs/Activities">
                  <FiList className={styles.iconButton}/>
                </IonTabButton>

                <IonTabButton tab="home" href="/tabs/Home">
                  <FiHome className={styles.iconButton}/>
                </IonTabButton>

                <IonTabButton tab="profile" href="/tabs/Profile">
                  <FiUser className={styles.iconButton}/>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          )}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}