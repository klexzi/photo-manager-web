import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import NotFoundPage from './pages/404/404'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'x-token': localStorage.getItem('token')
                ? `${localStorage.getItem('token')}`
                : '',
        },
    }
})

const uri =
    process.env.NODE_ENV === 'production'
        ? 'https://klexzi-photo-manager-server.herokuapp.com/graphql'
        : 'http://localhost:8000/graphql'

const cache = new InMemoryCache()
const HTTPLink = createUploadLink({
    uri,
})
const client = new ApolloClient({
    link: authLink.concat(HTTPLink),
    cache,
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-first' } },
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
