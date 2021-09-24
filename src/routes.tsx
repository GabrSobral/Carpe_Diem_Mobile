import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/react';
import { FiList, FiUser, FiHome } from 'react-icons/fi'
import { createElement   } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter  } from '@ionic/react-router';

import styles from './styles/routes.module.scss'

import { Home            } from './pages/Home';
import { Clock           } from './pages/Clock';
import { SignIn          } from './pages/SignIn';
import { SignUp          } from './pages/SignUp';
import { Profile         } from './pages/Profile';
import { Activities      } from './pages/Activities';
import { Questionnaire   } from './pages/Questionnaire';
import { ResetPassword   } from './pages/ResetPassword';
import { ChangePassword  } from './pages/ChangePassword';
import { ForgotPassword  } from './pages/ForgotPassword';
import { ActivityDetails } from './pages/ActivityDetail';

import { useUsers        } from './contexts/UserContext';

export const Routes: React.FC = () => {
  const { user } = useUsers()

  const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
     ( user ) ? 
        createElement(component, props) : 
        <Redirect to={{ pathname: "/SignIn" }} />
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
        <Route        exact path="/ForgotPassword" component={ForgotPassword} />
        <Route        exact path="/ResetPassword"  component={ResetPassword}  />
        <Route        exact path="/Questionnaire"  component={Questionnaire}  />
        <PrivateRoute exact path="/Clock"          component={Clock}          />
        <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />
  
        <Route
          path="/tabs"
          render={() => (
            <IonTabs>
              <IonRouterOutlet>
                <PrivateRoute exact path="/tabs/Home"            component={Home}            />
                <PrivateRoute exact path="/tabs/Profile"         component={Profile}         />
                <PrivateRoute exact path="/tabs/Activities"      component={Activities}      />
                <PrivateRoute exact path="/tabs/ActivityDetails" component={ActivityDetails} />
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