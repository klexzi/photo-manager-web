import React, { useState } from 'react'
import {
    Box,
    IconButton,
    Icon,
    Dialog,
    DialogTitle,
    Button,
    Typography,
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import useStyles from './Photo.css'
import Caption from '../Caption/Caption'
import { GET_PHOTOS } from '../Main/Main'
import PropTypes from 'prop-types'

const DELETE_PHOTO = gql`
    mutation DeletePhoto($photoId: Int!) {
        deletePhoto(photoId: $photoId)
    }
`

/**
 * Delelte Dialog component
 */
const DeleteDialog = ({
    openDialog,
    imageUrl,
    handleClose,
    loading,
    onYesClick,
}) => {
    const classes = useStyles()
    return (
        <Dialog open={openDialog} onClose={handleClose}>
            <Box className={classes.dialogBox}>
                <DialogTitle>Delete Photo</DialogTitle>
                <Box display="flex" justifyContent="center">
                    <img
                        className={classes.dialogImage}
                        src={imageUrl}
                        alt="venue"
                    />
                </Box>
                <Box display="flex" justifyContent="center" my={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        disabled={loading}
                        onClick={onYesClick}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        size="large"
                        disabled={loading}
                    >
                        No
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

/**
 *  Photo Dialog Component
 * @param {object} props component props
 */
const PhotoDialog = ({ openDialog, imageUrl, handleClose }) => {
    return (
        <Dialog open={openDialog} onClose={handleClose}>
            <img src={imageUrl} alt="venue" />
        </Dialog>
    )
}
/**
 * Photo Component
 * @param {object} props props
 */
const Photo = ({ photo }) => {
    const classes = useStyles()
    const [openDialog, setOpenDialog] = useState(false)
    const [openPhotoDialog, setOpenPhotoDialog] = useState(false)
    const [deletePhoto, { loading }] = useMutation(DELETE_PHOTO, {
        refetchQueries: [{ query: GET_PHOTOS }],
    })
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleClosePhotoDialog = () => {
        setOpenPhotoDialog(false)
    }
    const onDeletePhotoClick = photoId => {
        deletePhoto({
            variables: { photoId },
        }).then(() => {
            handleCloseDialog()
        })
    }
    return (
        <Box
            className={classes.photo}
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={3}
        >
            <Box className={classes.imageBox}>
                <img
                    className={classes.image}
                    src={photo.imageUrl}
                    alt="venue"
                    onClick={() => setOpenPhotoDialog(true)}
                />
                <IconButton
                    onClick={() => setOpenDialog(true)}
                    className={classes.deleteButton}
                >
                    <Icon>delete</Icon>
                </IconButton>
            </Box>

            <Caption caption={photo.caption} photoId={photo.id} />
            <Box p={1} px={2} borderRadius={3} className={classes.category}>
                <Typography variant="subtitle2">{photo.category}</Typography>
            </Box>
            <DeleteDialog
                openDialog={openDialog}
                imageUrl={photo.imageUrl}
                handleClose={handleCloseDialog}
                onYesClick={() => onDeletePhotoClick(photo.id)}
                loading={loading}
            />
            <PhotoDialog
                openDialog={openPhotoDialog}
                imageUrl={photo.imageUrl}
                handleClose={handleClosePhotoDialog}
            />
        </Box>
    )
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
}
export default Photo
