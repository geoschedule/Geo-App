import React from 'react';
import io from 'socket.io-client';
import { NativeRouter, Switch, Route } from 'react-router-native'
import { View, } from 'react-native'
//scenes
import Home from './src/scenes/home'
import Login from './src/scenes/auth'
import SignIn from './src/scenes/auth/signin'


console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


let SERVER_URL = "http://00d4e500.ngrok.io";
const socket = io.connect(SERVER_URL);

export default class App extends React.Component {
  render() {
    return (
        <NativeRouter>
          <Switch>

            <Route exact path='/Login' render={(routeProps => < Login {...routeProps} socket={socket} />)} />
            <Route exact path='/' render={(routeProps => < SignIn {...routeProps} socket={socket} />)} />
            <Route exact path='/Home' render={(routeProps => < Home {...routeProps} socket={socket} />)} />
          </Switch>
        </NativeRouter>
    );
  }
}
