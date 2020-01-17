import React, { useState } from 'react'
import {
    Box,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
} from '@material-ui/core'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidationType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidationSize from 'filepond-plugin-file-validate-size'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import PropTypes from 'prop-types'

import { GET_PHOTOS } from '../Main/Main'
import useStyles from './FileUpload.css'

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidationSize,
    FilePondPluginFileValidationType
)

const UPLOAD_FILES = gql`
    mutation AddPhoto($venueId: Int!, $category: Categories, $file: Upload!) {
        addPhoto(venueId: $venueId, category: $category, file: $file) {
            id
            imageUrl
        }
    }
`
const FileUpload = ({ handleClose, venueId }) => {
    const [file, setFile] = useState()
    const [category, setCategory] = useState('Profile')
    const classes = useStyles()
    const [upload, { loading, error }] = useMutation(UPLOAD_FILES, {
        refetchQueries: [{ query: GET_PHOTOS }],
    })

    const handleUpload = () => {
        upload({ variables: { venueId, file: file[0], category } }).then(() => {
            handleClose()
        })
    }
    if (error) {
        return <Typography variant="error"> Failed to upload image </Typography>
    }
    return (
        <Box width="100%" height="100%">
            <FilePond
                className={classes.uploadBox}
                allowFileSizeValidation
                maxFileSize="5MB"
                allowMultiple={false}
                instantUpload={false}
                acceptedFileTypes={['image/*']}
                onupdatefiles={fileItems => {
                    setFile(fileItems.map(fileItem => fileItem.file))
                }}
                labelFileTypeNotAllowed="Only images allowed"
                fileValidateTypeLabelExpectedTypes="Expects an image"
                labelIdle='Drag & Drop your Image or <span class="filepond--label-action">Browse</span>'
            />
            {file && (
                <Box
                    width="inherit"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <FormControl className={classes.formControl}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className={classes.select}
                        >
                            <MenuItem value={'Profile'}>Profile</MenuItem>
                            <MenuItem value={'Home'}>Home</MenuItem>
                            <MenuItem value={'Social'}>Social</MenuItem>
                            <MenuItem value={'Planning'}>Planning</MenuItem>
                            <MenuItem value={'Backup'}>Backup</MenuItem>
                        </Select>
                        <Button
                            onClick={handleUpload}
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={loading}
                        >
                            UPLOAD{' '}
                        </Button>
                    </FormControl>
                </Box>
            )}
        </Box>
    )
}

FileUpload.propTypes = {
    handleClose: PropTypes.func.isRequired,
    venueId: PropTypes.number.isRequired,
}

export default FileUpload
