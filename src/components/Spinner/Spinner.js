import React from 'react'

import spinnerSvg from '../../assets/loader.svg'
import { Box } from '@material-ui/core'
const Spinner = () => {
    return (
        <Box
            display="flex"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
        >
            <img src={spinnerSvg} alt="spinner" />
        </Box>
    )
}

export default Spinner
