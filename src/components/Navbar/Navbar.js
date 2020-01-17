import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'
import useStyles from './Navbar.css'
import PropTypes from 'prop-types'

const Navbar = ({ history }) => {
    const classes = useStyles()
    const client = useApolloClient()
    const handleSignout = async () => {
        localStorage.removeItem('token')
        await client.resetStore()
        history.push('/login')
    }
    return (
        <Box
            className={classes.navbar}
            display="flex"
            justifyContent="space-between"
        >
            <Typography className={classes.logoTitle} variant="h4">
                Photo Manager
            </Typography>
            <Button onClick={handleSignout}>
                <Typography variant="overline"> sign out</Typography>
            </Button>
        </Box>
    )
}

Navbar.propTypes = {
    history: PropTypes.object.isRequired,
}
export default withRouter(Navbar)
