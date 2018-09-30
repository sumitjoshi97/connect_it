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
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Landing} />
          <div className="container">
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
  onSetCurrentUser: (user) => dispatch(actions.setCurrentUser(user))
})
export default connect(
  null,
  mapDispatchToProps
)(App)
