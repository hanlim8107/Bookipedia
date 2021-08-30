import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import {RecoilRoot} from 'recoil';
import { Provider } from 'react-keep-alive';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <RecoilRoot>
        <HashRouter>
          <Provider include={["Home", 'SearchInput']}>
            <App/>
          </Provider>
        </HashRouter>
      </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
