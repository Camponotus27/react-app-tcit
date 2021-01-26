import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import postsReducer from './reducers/index.js';
import { fetchPosts } from './actions/index';

import './App.css';

import MainComponent from './components/MainComponent';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(postsReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));


store.dispatch(fetchPosts());

function App() {
  return (
    <Provider store={store}>
      <MainComponent></MainComponent>
    </Provider>
  );
}

export default App;
