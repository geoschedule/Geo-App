import React from 'react';
import io from 'socket.io-client';
import { NativeRouter, Switch, Route } from 'react-router-native'
import { View, } from 'react-native'
//scenes
import Home from './src/scenes/home'
import Login from './src/scenes/auth'

let SERVER_URL = "http://00d4e500.ngrok.io";
const socket = io.connect(SERVER_URL);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <NativeRouter>
          <Switch>
            <Route exact path='/' render={(routeProps => < Login {...routeProps} socket={socket} />)} />
            <Route exact path='/Home' render={(routeProps => < Home {...routeProps} socket={socket} />)} />
          </Switch>
        </NativeRouter>
      </View>
    );
  }
}
