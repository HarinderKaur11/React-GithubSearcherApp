import React, {Component} from 'react';
import Profile from './Components/Profile';
import Search from './Components/Search';

const API = 'https://api.github.com/users'

class Github extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: 'harinderkaur11',
      name: '',
      avatar: '',
      repos:'',
      followers:'',
      following:'',
      homeURL:'',
      notFound:''
    };
  }

  //method for fetching the api
  getProfile(username){
    //create a url
    let finalURL = `${API}/${username}`;

    //.then will take a callback ftn and give us res back
    fetch(finalURL)
    .then((res) => res.json())//res results a json object
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message
      });
    })
    .catch((error) => console.log('there was a problem in fetching data'))
  }

  componentDidMount(){
    this.getProfile(this.state.username);

  }

  render(){
    return(
      <div>
        <section id="card">
        <Search searchProfile={this.getProfile.bind(this)}/>
        <Profile userData = {this.state} />
        </section>
      </div>
    );
  }
}

export default Github;
