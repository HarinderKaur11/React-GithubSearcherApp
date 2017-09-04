import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

  onLogin(){
    this.props.onLogin();
  }

  onLogoutn(){
    this.props.onLogout();
  }


  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Github Searcher{//logo
            }
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem onClick={this.onLogin.bind(this)}> Login</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
