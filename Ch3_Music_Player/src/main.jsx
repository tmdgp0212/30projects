import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyle from './style/globalStyle'
import { createStore } from 'redux';
import musicPlayerReducer from './store/musicPlayerReducer'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(musicPlayerReducer, composeWithDevTools())
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <GlobalStyle />
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
)
