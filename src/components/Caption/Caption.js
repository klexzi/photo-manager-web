import React, { useState } from 'react'
import { Box, Typography, IconButton, Icon, InputBase } from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import useStyles from './Caption.css'

const EDIT_CAPTION = gql`
    mutation EditCaption($photoId: Int!, $caption: String!) {
        editCaption(photoId: $photoId, caption: $caption) {
            id
            imageUrl
            caption
            category
        }
    }
`
const CaptionContent = ({ caption, setEditMode }) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            {!caption || caption.trim().length < 1 ? (
                <Typography
                    className={classes.noCaptionText}
                    variant="subtitle2"
                >
                    ( Add Caption )
                </Typography>
            ) : (
                <Typography variant="subtitle1">{caption}</Typography>
            )}
            <IconButton
                onClick={() => setEditMode(true)}
                className={classes.iconButton}
                arial-label="edit"
            >
                <Icon>edit</Icon>
            </IconButton>
        </React.Fragment>
    )
}

const CaptionForm = ({ caption, photoId, setEditMode }) => {
    const classes = useStyles()
    const [value, setValue] = useState(caption)
    const [editCaption] = useMutation(EDIT_CAPTION)

    const handleSubmit = e => {
        e.preventDefault()
        editCaption({
            variables: { photoId, caption: value },
        }).then(() => {
            setEditMode(false)
        })
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <InputBase
                    value={value}
                    placeholder="Write here"
                    onChange={e => setValue(e.target.value)}
                />
                <IconButton
                    onClick={() => setEditMode(false)}
                    className={classes.iconButton}
                    arial-label="cancel"
                >
                    <Icon>clear</Icon>
                </IconButton>
                <IconButton
                    className={classes.iconButton}
                    arial-label="done"
                    type="submit"
                >
                    <Icon>check</Icon>
                </IconButton>
            </form>
        </React.Fragment>
    )
}
const Caption = ({ caption, photoId }) => {
    const [editMode, setEditMode] = useState(false)
    return (
        <Box my={1} display="flex">
            {editMode ? (
                <CaptionForm
                    caption={caption}
                    photoId={photoId}
                    setEditMode={setEditMode}
                />
            ) : (
                <CaptionContent caption={caption} setEditMode={setEditMode} />
            )}
        </Box>
    )
}

Caption.propTypes = {
    caption: PropTypes.string,
    photoId: PropTypes.number.isRequired,
}
export default Caption
