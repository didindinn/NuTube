import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as Action from './actions/video_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  ///////// testing only! //////////
  window.createVideo = Action.createVideo;
  window.requestVideos = Action.requestVideos;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ///////// testing only! //////////
  ReactDOM.render(<Root store={ store } />, root);
});