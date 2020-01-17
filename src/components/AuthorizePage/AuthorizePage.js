import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Redirect, withRouter } from 'react-router-dom'

import Spinner from '../Spinner/Spinner'

const VERIFY_TOKEN = gql`
    mutation VerifyToken($token: String!) {
        verifyToken(token: $token)
    }
`
const AuthorizePage = props => {
    const token = localStorage.getItem('token')
    if (!token) {
        props.history.push('/login')
    }
    const [verifyToken, { data, loading }] = useMutation(VERIFY_TOKEN, {
        context: { headers: { 'x-token': '' } },
    })
    useEffect(() => {
        const run = () => {
            if (token) {
                verifyToken({ variables: { token } })
            }
        }
        run()
    }, [verifyToken, token])

    return (
        <React.Fragment>
            {loading || !data ? (
                <Spinner />
            ) : data && data.verifyToken ? (
                props.children
            ) : (
                <Redirect to="/login" />
            )}
        </React.Fragment>
    )
}

export default withRouter(AuthorizePage)
