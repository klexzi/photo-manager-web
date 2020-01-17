import React from 'react'
import { Backdrop, Modal, Fade, Box, IconButton, Icon } from '@material-ui/core'
import PropTypes from 'prop-types'

import FileUpload from '../FileUpload/FileUpload'
import useStyles from './UploadModal.css'

const UploadModal = ({ open, handleClose, venueId }) => {
    const classes = useStyles()
    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                className={classes.modal}
                onClose={handleClose}
                closeAfterTransition
                disableBackdropClick
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.paper}>
                        <IconButton
                            onClick={handleClose}
                            className={classes.modalCloseIcon}
                        >
                            <Icon>clear</Icon>
                        </IconButton>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height={'100%'}
                        >
                            <FileUpload
                                handleClose={handleClose}
                                venueId={venueId}
                            />
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}

UploadModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    venueId: PropTypes.number.isRequired,
}
export default UploadModal
