import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

// import redux libraries
import { Provider } from 'react-redux'

// import files
import './index.css'
import App from './App'
import store from './store/store'

// import servie worker
import registerServiceWorker from './registerServiceWorker'

// defining react app inside redux store provider
const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

// redering react app to DOM
ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
