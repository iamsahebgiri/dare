import React from 'react';
import { Avatar, IconButton, useColorMode, Link } from "@chakra-ui/core";
import { FiChevronLeft } from "react-icons/fi";
import { Link as RouterLink, Redirect } from "react-router-dom";
import "./Profile.css";
import DarkMode from '../../components/DarkMode';
import { auth } from "./../../config/firebaseConfig";

function Profile({ displayName, photoURL, handleLogout }) {
  const { colorMode } = useColorMode();
  const color = { light: "gray.800", dark: "white" };
  return (
    <div className="onboarding-container">
      <div className="onboarding-heading">
        <div className="back">
          <Link as={RouterLink} to="/">
            <IconButton isRound="true" size="sm" icon={FiChevronLeft} color={color[colorMode]} />
          </Link>
        </div>
        <div>Profile</div>
        <div>
          <DarkMode />
        </div>
      </div>
      <div className="profile-picture">
        <Avatar size="2xl" src={photoURL} />
        <span>{displayName}</span>
      </div>
      <div>
        Content goes here
      </div>
      <div className="btn-group">
        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
      </div>
    </div >
  )
}

class ProfileClass extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: "Loading...",
      photoURL: "",
      isAuthenticated: false,
    }

    this.handleLogout = this.handleLogout.bind(this);
  }
  _isMounted = false // memory leak stuff
  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAuthenticated: true,
            firedLogout: false
          })
        }
      })
    }

  }
  componentWillUnmount() {
    this._isMounted = false
  }
  handleLogout(e) {
    if (this._isMounted) {
      auth.signOut().then(function () {
        console.log("Signed out successfully....")
      }).catch(function (error) {
        console.log(error)
      });
    }

  }
  render() {
    if (auth.currentUser == null) return <Redirect to="/login" />
    return (
      <Profile firedLogout={this.state.firedLogout} handleLogout={this.handleLogout} displayName={this.state.displayName} photoURL={this.state.photoURL} />
    );
  }

}

export default ProfileClass;