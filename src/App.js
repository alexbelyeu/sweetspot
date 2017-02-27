import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

// Not converting to pure function because eventually
// will use cdm to load stuff at beginning
class App extends Component {
  render() {
    const store = createStore(
      reducers,
      {},
      compose(
        applyMiddleware(ReduxThunk),
        autoRehydrate(),
      ),
    );

    persistStore(store, { storage: AsyncStorage });

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
