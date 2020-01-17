import React from 'react'
import { Grid } from '@material-ui/core'
import Photo from '../Photo/Photo'
import PropTypes from 'prop-types'

const PhotoList = ({ photos }) => {
    return (
        <Grid container spacing={4}>
            {photos.map(photo => (
                <Grid key={photo.id} item md={4}>
                    <Photo photo={photo} />
                </Grid>
            ))}
        </Grid>
    )
}

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired,
}
export default PhotoList
