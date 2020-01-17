import React from 'react'
import { Box } from '@material-ui/core'

import useStyles from './404.css'

const NotFoundPage = () => {
    const classes = useStyles()
    return <Box className={classes.notFound}></Box>
}

export default NotFoundPage
