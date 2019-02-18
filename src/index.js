import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import {Provider } from 'react-redux'
import { BrowserRouter,Route,Redirect,Switch } from 'react-router-dom'
import reducers from './reducer'
import Login from './pages/login/login'
import Register from './pages/register/register'
import AuthoRoute from './components/authroute/authroute'

const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
    <div>
      <AuthoRoute></AuthoRoute>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </div>
    </BrowserRouter>
  </Provider>
  ),
  document.getElementById('root')
)



