import React from 'react'
import { Box, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

import useStyles from './Categories.css'

const Categories = ({ handleClick, categories }) => {
    const classes = useStyles()
    return (
        <Box display="flex" mb={5}>
            {categories.map(category => (
                <Button
                    className={classes.categoryButton}
                    variant="outlined"
                    size="large"
                    onClick={() => handleClick(category)}
                    key={category}
                >
                    {category}
                </Button>
            ))}
        </Box>
    )
}

Categories.propTypes = {
    handleClick: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
}
export default Categories
