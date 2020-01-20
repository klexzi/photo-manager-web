import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import useStyles from './LoginForm.css'
import { formatGraphqlError } from '../../libs/utils'

const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
        }
    }
`
const LoginForm = ({ history }) => {
    const classes = useStyles()
    const [signin, { loading }] = useMutation(SIGN_IN, {
        context: { headers: { 'x-token': '' } },
    })
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorState, setErrorState] = useState()
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if (formData.email.length < 1 || formData.password.length < 1) {
            setErrorState('Please all fields')
            return
        }
        signin({
            variables: { email: formData.email, password: formData.password },
        })
            .then(({ data }) => {
                const { token } = data.signIn
                localStorage.setItem('token', token)
                history.push('/')
            })
            .catch(error => {
                setErrorState(formatGraphqlError(error.message))
            })
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.formBox}
            p={4}
        >
            <Typography className={classes.logoTitle} variant="h2">
                Photo Manager
            </Typography>
            <Typography className={classes.subtitles} variant="h4">
                Manage your photos with ease
            </Typography>
            <Typography className={classes.subtitles} variant="overline">
                Sign in here to get started
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    label="Email"
                    border="unset"
                    autoComplete="off"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    className={classes.input}
                    variant="outlined"
                    label="Password"
                    border="unset"
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                    disabled={loading}
                >
                    Sign In
                </Button>
            </form>
            {errorState && (
                <Box my={1}>
                    <Typography color="error">{errorState}</Typography>
                </Box>
            )}
        </Box>
    )
}

LoginForm.propTypes = {
    history: PropTypes.object.isRequired,
}
export default withRouter(LoginForm)
