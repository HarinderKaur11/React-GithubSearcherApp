import React, { Component } from 'react';
//import logo from './logo.svg';
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
    //  console.log(authResult);
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if(error){
        console.log(error);
        return;
      }
    //  console.log( profile);\
    this.setProfile(authResult.idToken, profile);
    });
    });
    this.getProfile(); // if the user is already signed in
  }

  setProfile(idToken, profile){
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('profile', JSON.stringify(profile)) // since profile is a json object you can wrap it in javascript stringify ibject
    //you can set as many objects here but they shld be in string format
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile(){
    // first check if the local storage is empty or has something
    if(localStorage.getItem('idToken')!=null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
        //setStae can also take a callback function
      }, () => {
        console.log(this.state);
      });
    }
  }

  showLock(){
    this.lock.show();
  }

  //logout code
  //first set the local storage to remove the idToken and profile
  //then set the state to be null
  logout(){
    this.setState({
      idToken: '',
      profile: ''
      //use callback to clear up the local storage
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
    //since navigation bar is in a separate component we have to pass this logout there
    //it can be passed as another prop
  }

  render() {
    let gitty;
    // check whether user is logged in or not
    //if the state variable of id token is empty it means that the user is not logged in
    if(this.state.idToken){
      gitty = <Github />
    }else{
      gitty = "Login or Signup to use th Application"
    }

    return (
      <div className="App">
      {
        //we also need to pass id and token as prop to check the login/logout state
          }
        <Header
        lock={this.lock}
        idToken={this.state.idToken}
        onLogout={this.logout.bind(this)}
        onLogin={this.showLock.bind(this)}
        />
        <h1>WELCOME to The Github Searcher!!!</h1>
      <h1><i>{gitty}</i></h1>
      </div>
    );
  }
}

export default App;
