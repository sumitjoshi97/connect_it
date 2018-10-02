import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'

// importing files
import './App.css'
import Header from './components/Layout/Header/Header'
import Landing from './components/Layout/Landing/Landing'
import Footer from './components/Layout/Footer/Footer'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'
import Profile from './components/Profile/Profile'
import CreateProfile from './components/CreateProfile/CreateProfile'
import EditProfile from './components/EditProfile/EditProfile'
import setAuthToken from './store/utils/setAuthToken'
import * as actions from './store/actions/index'
import Dashboard from './components/Dashboard/Dashboard'
import AddExperience from './components/AddCredentials/AddExperience/AddExperience'

// app component
class App extends Component {
  componentDidMount() {
    // check for token
    if (localStorage.jwtToken) {
      // set auth token
      setAuthToken(localStorage.jwtToken)
      // decode token and get user
      const decoded = jwt_decode(localStorage.jwtToken)
      // set user and isAuth
      this.props.onSetCurrentUser(decoded)
      console.log(decoded)
      // check for expired token
      const currentTime = Date.now() / 1000
      console.log(currentTime)
      if (decoded.exp < currentTime) {
        // logout user
        this.props.onLogoutUser()
        //clear current profile
        this.props.onClearCurrentProfile()
        //redirect to logins
        window.location.href = '/login'
      }
    }
  }

  render() {
    // routes for authenticated users
    const authRoutes = (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/create-profile" component={CreateProfile} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/add-experience" component={AddExperience} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/" />
      </Switch>
    )

    // routes for users that are not logged in
    const guestRoutes = (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    )
    return (
      <Router>
        <div className="App">
          <Header />
          {/* <div className="container"> */}
          {this.props.isAuth ? authRoutes : guestRoutes}
          {/* </div> */}

          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  onSetCurrentUser: user => dispatch(actions.setCurrentUser(user)),
  onLogoutUser: () => dispatch(actions.logoutUser()),
  onClearCurrentProfile: () => dispatch(actions.clearCurrentProfile())
})

// export app wrapped in redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
