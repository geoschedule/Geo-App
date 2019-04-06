import React from 'react';
import io from 'socket.io-client';
import {NativeRouter,Switch,Route} from 'react-router-native'
//scenes
import Home from './src/scenes/home'
import Login from './src/scenes/auth'

let SERVER_URL = "http://8cfbf6bf.ngrok.io";
const socket = io.connect(SERVER_URL);

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
            <Route exact path = '/' render = {(routeProps => < Login {...routeProps} socket = {socket} />)}/>
            <Route exact path = '/Home' render = {(routeProps => < Home {...routeProps} socket = {socket} />)}/>
        </Switch> 
      </NativeRouter>
    );
  }
}