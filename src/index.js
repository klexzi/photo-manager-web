import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'normalize.css'
const renderer = App => {
    ReactDOM.render(<App />, document.getElementById('root'))
}
renderer(App)
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        renderer(NextApp)
    })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
