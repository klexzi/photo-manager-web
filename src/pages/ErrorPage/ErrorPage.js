import React from 'react'
import { Box } from '@material-ui/core'

import useStyles from './ErrorPage.css'

const ErrorPage = () => {
    const classes = useStyles()
    return <Box className={classes.errorPage}></Box>
}

export default ErrorPage
