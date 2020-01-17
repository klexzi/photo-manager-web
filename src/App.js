import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import NotFoundPage from './pages/404/404'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const token = localStorage.getItem('token')
const cache = new InMemoryCache()
const baseUrl = 'http://localhost:8000/graphql'
const httpLink = createUploadLink({
    uri: baseUrl,
    headers: {
        'x-token': token ? token : '',
    },
})
const client = new ApolloClient({
    link: httpLink,
    cache,
})

function App() {
    return (
        <ErrorBoundary>
            <ApolloProvider client={client}>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="*">
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </Router>
            </ApolloProvider>
        </ErrorBoundary>
    )
}

export default App
