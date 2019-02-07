import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'

// importing files
import './App.css'
import Spinner from './components/Common/Spinner/Spinner'
import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import setAuthToken from './utils/setAuthToken'
import store from './store/store'
import jwt_decode from 'jwt-decode'
import {
  setCurrentUser,
  logoutUser,
  clearCurrentProfile
} from './store/actions/index'

import './App.css'
import './sass/utilities.scss'
import './sass/components.scss'

// loading component async
const Landing = Loadable({
  loader: () => import('./components/Layout/Landing/Landing'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Register = Loadable({
  loader: () => import('./components/Auth/Register/Register'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Login = Loadable({
  loader: () => import('./components/Auth/Login/Login'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Profile = Loadable({
  loader: () => import('./components/Profile/Profile'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Profiles = Loadable({
  loader: () => import('./components/Profiles/Profiles'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const CreateProfile = Loadable({
  loader: () => import('./components/Dashboard/CreateProfile/CreateProfile'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const EditProfile = Loadable({
  loader: () => import('./components/Dashboard/EditProfile/EditProfile'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Dashboard = Loadable({
  loader: () => import('./components/Dashboard/Dashboard'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const AddExperience = Loadable({
  loader: () =>
    import('./components/AddCredentials/AddExperience/AddExperience'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const AddEducation = Loadable({
  loader: () => import('./components/AddCredentials/AddEducation/AddEducation'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Posts = Loadable({
  loader: () => import('./components/Posts/Posts'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

const Post = Loadable({
  loader: () => import('./components/Post/Post'),
  loading: () => (
    <div>
      <Spinner />
    </div>
  )
})

// check for token in localstorage
if (localStorage.jwtToken) {
  // set auth token
  setAuthToken(localStorage.jwtToken)
  // decode token and get user
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and isAuth
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser())
    //clear current profile
    store.dispatch(clearCurrentProfile())
    //redirect to login
    window.location.href = '/login'
  }
}

// app component
class App extends Component {
  render() {
    // routes for users that are not logged in
    let routes = (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    )

    // routes for authenticated users
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/profile/:handle" exact component={Profile} />
          <Route path="/profiles" exact component={Profiles} />
          <Route path="/create-profile" component={CreateProfile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/add-experience" exact component={AddExperience} />
          <Route path="/add-education" exact component={AddEducation} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Landing} />
          <Redirect to="/dashboard" />
        </Switch>
      )
    }

    return (
      <div className="app">
        <Header />
        <div style={{ flex: 1 }}>{routes}</div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
})
// export app wrapped in redux store
export default withRouter(connect(mapStateToProps)(App))
