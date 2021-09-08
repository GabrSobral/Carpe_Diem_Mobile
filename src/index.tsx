import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingProvider } from './contexts/LoadingContext'
import App from './App';
import './styles/global.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();