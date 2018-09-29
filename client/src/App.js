import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// importing files
import './App.css'
import Header from './components/Layout/Header/Header'
import Landing from './components/Layout/Landing/Landing'
import Footer from './components/Layout/Footer/Footer'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'

// app component
class App extends Component {
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

export default App
