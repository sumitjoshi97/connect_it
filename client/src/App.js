import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
// importing files
import './App.css'
import Header from './components/Layout/Header/Header'
import Landing from './components/Layout/Landing/Landing'
import Footer from './components/Layout/Footer/Footer'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'
import setAuthToken from './store/utils/setAuthToken'
import * as actions from './store/actions/authActions'
import Dashboard from './components/Dashboard/Dashboard'

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

      // check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // logout user
        this.props.onLogoutUser()
        //clear current profile

        //redirect to logins
        window.location.href = '/login'
      }
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSetCurrentUser: user => dispatch(actions.setCurrentUser(user)),
  onLogoutUser: () => dispatch(actions.loginUser),
  onClearCurrentProfile: () => dispatch(actions.clearCurrentProfile())
})

// export app wrapped in redux store
export default connect(
  null,
  mapDispatchToProps
)(App)
