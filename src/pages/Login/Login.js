import React from 'react'
import { Box } from '@material-ui/core'

import useStyles from './Login.css'
import LoginForm from '../../components/LoginForm/LoginForm'
const Login = () => {
    const classes = useStyles()
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.page}
        >
            <LoginForm />
        </Box>
    )
}

export default Login
