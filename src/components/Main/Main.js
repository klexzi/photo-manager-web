import React, { useState } from 'react'
import { Typography, Box, Button } from '@material-ui/core'

import Categories from '../Categories/Categories'
import PhotoList from '../PhotoList/PhotoList'
import UploadModal from '../UploadModal/UploadModal'

import useStyles from './Main.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Spinner from '../Spinner/Spinner'

const ME = gql`
    query Me {
        me {
            id
            email
            venue {
                id
                name
                location
            }
        }
    }
`
export const GET_PHOTOS = gql`
    query Photos($filterValue: Categories) {
        photos(filterValue: $filterValue) {
            id
            imageUrl
            caption
            category
        }
    }
`
const Main = () => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const { loading, error, data, refetch } = useQuery(GET_PHOTOS)
    const { data: dataForMe } = useQuery(ME)
    const handleCategoryClick = category => {
        refetch({ filterValue: category === 'All' ? undefined : category })
    }
    const handleModalOpen = () => {
        setOpenModal(true)
    }
    const handleModalClose = () => {
        setOpenModal(false)
    }
    return (
        <Box p={5} className={classes.container}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h4">
                    {dataForMe && dataForMe.me.venue.name}
                </Typography>
                <Button
                    onClick={handleModalOpen}
                    color="primary"
                    variant="contained"
                    size="large"
                >
                    Upload Photos
                </Button>
            </Box>
            <Categories
                handleClick={handleCategoryClick}
                categories={[
                    'All',
                    'Profile',
                    'Home',
                    'Social',
                    'Planning',
                    'Backup',
                ]}
            />
            {loading && <Spinner />}
            {data ? (
                data.photos.length > 0 ? (
                    <PhotoList photos={data.photos} />
                ) : (
                    <div>No photos found for this venue</div>
                )
            ) : null}
            {error && <div>an error occured while fetching photos</div>}
            {dataForMe && (
                <UploadModal
                    open={openModal}
                    handleClose={handleModalClose}
                    venueId={dataForMe.me.venue.id}
                />
            )}
        </Box>
    )
}

export default Main
