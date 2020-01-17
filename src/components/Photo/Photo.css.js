import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    photo: {
        width: '100%',
    },
    imageBox: {
        backgroundColor: '#ccc',
        width: '100%',
        height: '300px',

        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        transition: 'transform 0.5s linear 0.1s',
        '&:hover': {
            transform: 'scale(1.2, 1.2)',
        },
        cursor: 'pointer',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: theme.palette.error.main,
    },
    dialogBox: {
        width: '60%',
        minWidth: '500px',
    },
    dialogImage: {
        width: 'auto',
        height: 'auto',
        maxWidth: '90%',
        maxHeight: '400px',
    },
    category: {
        backgroundColor: '#d9d9d9',
        borderRadius: '50px',
    },
}))
