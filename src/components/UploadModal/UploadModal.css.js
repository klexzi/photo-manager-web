import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '60vw',
        height: 'inherit',
        maxHeight: '70vh',
        overflowY: 'scroll',
        backgroundColor: '#f1f0ef',
        border: '2px solid #e6e6e6',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        '&:focus': {
            outline: 'unset',
        },
    },
    modalCloseIcon: {
        position: 'relative',
        right: 0,
        top: 0,
        zIndex: 10000,
    },
}))
