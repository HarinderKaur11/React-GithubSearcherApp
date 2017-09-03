import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Github from './Github';
import Auth0Lock from 'auth0-lock';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {

      }
    };
  }

  static defaultProps = {
    clientID: 'VeOa03onU8CNMFLmO0avqS8MrbPDyI57',
    domain: 'harinder.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
    });
  }

  showLock(){
    this.lock.show();
  }


  render() {
    return (
      <div className="App">
        <Header
        onLogin={this.showLock.bind(this)}/>
        <Github />
      </div>
    );
  }
}

export default App;
