import React from 'react'
import ReactDOM from 'react-dom'

// import redux libraries
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// import files
import './index.css'
import App from './App'
import rootReducer from './store/reducers/rootReducer'

// import servie worker
import registerServiceWorker from './registerServiceWorker'

// setup redux dev-tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// crete redux store 
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// defining react app inside redux store provider
const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

// redering react app to DOM
ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
