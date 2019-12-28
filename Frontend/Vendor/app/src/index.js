import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ScrollContext } from 'react-router-scroll-4';
import Routes from './redux/routes';
import './index.scss';

import configureStore from './redux/store';
const initialState = {};

const history = createHistory();

ReactDOM.render(
  <Provider store={configureStore(initialState, history)}>
    <BrowserRouter basename={'/'}>
			<ScrollContext>
      	<Routes />
			</ScrollContext>
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));


